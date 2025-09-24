'use client';

import { eyeScreeningAnalysis, type EyeScreeningAnalysisOutput } from '@/ai/flows/eye-screening-analysis';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, Eye, Lightbulb, Loader2, Video, XCircle, Download, UserCheck, RefreshCw, AlertTriangle, MonitorSmartphone } from 'lucide-react';
import { useRef, useState, useEffect, useCallback } from 'react';

type Step = 'checklist' | 'capture-left' | 'capture-right' | 'analyze' | 'results';
const STEPS = {
  checklist: { title: 'Pre-Screening Checklist' },
  'capture-left': { title: 'Capturing Left Eye' },
  'capture-right': { title: 'Capturing Right Eye' },
  analyze: { title: 'Analyzing Your Results' },
  results: { title: 'Screening Results' },
};

export default function EyeScreeningWorkflow() {
  const [step, setStep] = useState<Step>('checklist');
  const [photos, setPhotos] = useState<{ left: string | null; right: string | null }>({ left: null, right: null });
  const [analysisResult, setAnalysisResult] = useState<EyeScreeningAnalysisOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleStartCapture = () => setStep('capture-left');

  const handleCapture = (eye: 'left' | 'right', dataUri: string) => {
    setPhotos(p => ({ ...p, [eye]: dataUri }));
    if (eye === 'left') {
      toast({ title: 'Left eye captured!', description: 'Now, let\'s get your right eye.' });
      setStep('capture-right');
    } else {
      setStep('analyze');
    }
  };

  useEffect(() => {
    if (step === 'analyze' && photos.left && photos.right) {
      const runAnalysis = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const result = await eyeScreeningAnalysis({
            leftEyePhotoDataUri: photos.left!,
            rightEyePhotoDataUri: photos.right!,
            userDescription: "User is performing a self-screening for diabetic retinopathy."
          });
          setAnalysisResult(result);
          setStep('results');
        } catch (e) {
          console.error(e);
          setError('An error occurred during analysis. Please try again.');
          toast({ variant: 'destructive', title: 'Analysis Failed', description: 'Could not analyze eye photos.' });
          setStep('capture-right'); // Go back to allow retake
        } finally {
          setIsLoading(false);
        }
      };
      runAnalysis();
    }
  }, [step, photos, toast]);
  
  const resetWorkflow = () => {
    setStep('checklist');
    setPhotos({ left: null, right: null });
    setAnalysisResult(null);
    setError(null);
  };

  const renderContent = () => {
    switch (step) {
      case 'checklist':
        return <Checklist onStart={handleStartCapture} />;
      case 'capture-left':
        return <CameraCapture eye="left" onCapture={handleCapture} />;
      case 'capture-right':
        return <CameraCapture eye="right" onCapture={handleCapture} />;
      case 'analyze':
        return <Analysis loading={isLoading} error={error} />;
      case 'results':
        return <Results result={analysisResult} onReset={resetWorkflow} />;
      default:
        return <Checklist onStart={handleStartCapture} />;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-center">{STEPS[step].title}</CardTitle>
      </CardHeader>
      <CardContent className="min-h-[400px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

const Checklist = ({ onStart }: { onStart: () => void }) => {
  const items = [
    { icon: MonitorSmartphone, text: 'Ensure good, even lighting.' },
    { icon: XCircle, text: 'Remove glasses or contact lenses.' },
    { icon: UserCheck, text: 'Find a stable surface for your phone.' },
    { icon: Eye, text: 'You will need about 3-5 minutes.' },
  ];
  return (
    <div className="space-y-6 text-center">
      <ul className="space-y-4 text-left max-w-md mx-auto">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-4 text-lg">
            <item.icon className="h-8 w-8 text-primary shrink-0" />
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
      <Card className="bg-accent/20 border-accent/50 max-w-md mx-auto">
        <CardContent className="pt-6 flex items-center gap-4">
          <Lightbulb className="h-8 w-8 text-accent-foreground" />
          <p className="text-sm font-semibold">
            AI Tip: For best results, sit about 2 feet from a window during daytime.
          </p>
        </CardContent>
      </Card>
      <Button size="lg" onClick={onStart}>I'm Ready, Start Screening</Button>
    </div>
  );
};

const CameraCapture = ({ eye, onCapture }: { eye: 'left' | 'right'; onCapture: (eye: 'left' | 'right', dataUri: string) => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
    } catch (err) {
      console.error("Camera error:", err);
      setError("Could not access camera. Please check permissions and try again.");
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, [startCamera, stream]);

  const handleCaptureClick = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const dataUri = canvasRef.current.toDataURL('image/jpeg');
        onCapture(eye, dataUri);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-lg text-muted-foreground">
        Hold your phone steady and look directly at the camera with your <span className="font-bold text-primary">{eye} eye</span>.
      </p>
      <div className="relative w-full max-w-md aspect-video bg-muted rounded-lg overflow-hidden">
        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-4 border-dashed border-green-400 rounded-full animate-pulse flex items-center justify-center">
                 <div className="w-4 h-4 bg-green-400 rounded-full" />
            </div>
        </div>
      </div>
      {error && <p className="text-destructive text-sm">{error}</p>}
      <Button size="lg" onClick={handleCaptureClick} disabled={!stream}>
        <Video className="mr-2 h-5 w-5" /> Capture {eye.charAt(0).toUpperCase() + eye.slice(1)} Eye
      </Button>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};


const Analysis = ({ loading, error }: { loading: boolean; error: string | null }) => (
  <div className="text-center space-y-4">
    {loading && (
      <>
        <Loader2 className="h-16 w-16 text-primary animate-spin mx-auto" />
        <h3 className="text-xl font-semibold">Analyzing retinal patterns...</h3>
        <p className="text-muted-foreground">This will take 15-30 seconds. Please wait.</p>
      </>
    )}
    {error && (
      <>
        <AlertTriangle className="h-16 w-16 text-destructive mx-auto" />
        <h3 className="text-xl font-semibold text-destructive">Analysis Failed</h3>
        <p className="text-muted-foreground">{error}</p>
      </>
    )}
  </div>
);

const Results = ({ result, onReset }: { result: EyeScreeningAnalysisOutput | null; onReset: () => void }) => {
  if (!result) return <p>No results to display.</p>;
  
  const getStatus = (analysis: string): {label: string, color: string, icon: any} => {
    if (analysis.toLowerCase().includes('mild') || analysis.toLowerCase().includes('early')) {
      return { label: 'Mild Changes', color: 'text-amber-500', icon: <AlertTriangle className="h-6 w-6 text-amber-500" /> };
    }
    if (analysis.toLowerCase().includes('severe') || analysis.toLowerCase().includes('advanced')) {
      return { label: 'Advanced Changes', color: 'text-red-500', icon: <XCircle className="h-6 w-6 text-red-500" /> };
    }
    return { label: 'Normal', color: 'text-green-500', icon: <CheckCircle className="h-6 w-6 text-green-500" /> };
  }

  const leftEyeStatus = getStatus(result.leftEyeAnalysis);
  const rightEyeStatus = getStatus(result.rightEyeAnalysis);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6 text-center">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Left Eye</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className={cn("text-2xl font-bold flex items-center justify-center gap-2", leftEyeStatus.color)}>{leftEyeStatus.icon} {leftEyeStatus.label}</div>
            <p className="text-sm text-muted-foreground">{result.leftEyeAnalysis}</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle className="font-headline">Right Eye</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className={cn("text-2xl font-bold flex items-center justify-center gap-2", rightEyeStatus.color)}>{rightEyeStatus.icon} {rightEyeStatus.label}</div>
            <p className="text-sm text-muted-foreground">{result.rightEyeAnalysis}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="font-headline text-primary">AI Analysis Summary</CardTitle></CardHeader>
        <CardContent><p>{result.summary}</p></CardContent>
      </Card>
      
      <Card>
        <CardHeader><CardTitle className="font-headline text-primary">Personalized Recommendations</CardTitle></CardHeader>
        <CardContent><p>{result.recommendations}</p></CardContent>
      </Card>

      <div className="flex flex-wrap gap-4 justify-center">
        <Button><Download className="mr-2 h-4 w-4" /> Download Report</Button>
        <Button variant="outline">Find Specialists</Button>
        <Button variant="outline">Set Reminders</Button>
        <Button variant="secondary" onClick={onReset}><RefreshCw className="mr-2 h-4 w-4" /> Start New Screening</Button>
      </div>
    </div>
  );
};
