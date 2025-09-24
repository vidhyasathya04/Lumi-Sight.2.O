
'use client';

import { eyeScreeningAnalysis, type EyeScreeningAnalysisOutput } from '@/ai/flows/eye-screening-analysis';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, Eye, Lightbulb, Loader2, Upload, XCircle, Download, UserCheck, RefreshCw, AlertTriangle, MonitorSmartphone } from 'lucide-react';
import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';


type Step = 'checklist' | 'upload-left' | 'upload-right' | 'analyze' | 'results';
const STEPS = {
  checklist: { title: 'Pre-Screening Checklist' },
  'upload-left': { title: 'Uploading Left Eye Image' },
  'upload-right': { title: 'Uploading Right Eye Image' },
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

  const handleStartUpload = () => setStep('upload-left');

  const handleUpload = (eye: 'left' | 'right', dataUri: string) => {
    setPhotos(p => ({ ...p, [eye]: dataUri }));
    if (eye === 'left') {
      toast({ title: 'Left eye image loaded!', description: 'Now, let\'s get your right eye.' });
      setStep('upload-right');
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
          setStep('upload-right'); // Go back to allow re-upload
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
        return <Checklist onStart={handleStartUpload} />;
      case 'upload-left':
        return <ImageUpload eye="left" onUpload={handleUpload} />;
      case 'upload-right':
        return <ImageUpload eye="right" onUpload={handleUpload} />;
      case 'analyze':
        return <Analysis loading={isLoading} error={error} />;
      case 'results':
        return <Results result={analysisResult} onReset={resetWorkflow} />;
      default:
        return <Checklist onStart={handleStartUpload} />;
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
    { icon: MonitorSmartphone, text: 'Use a clear, well-lit photo of your eye.' },
    { icon: XCircle, text: 'Ensure the image is not blurry.' },
    { icon: UserCheck, text: 'Make sure no reflections obscure the view.' },
    { icon: Eye, text: 'You will need photos of both your left and right eye.' },
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
            AI Tip: For best results, use a recent, high-resolution photo taken in good lighting.
          </p>
        </CardContent>
      </Card>
      <Button size="lg" onClick={onStart}>I'm Ready, Start Screening</Button>
    </div>
  );
};

const ImageUpload = ({ eye, onUpload }: { eye: 'left' | 'right'; onUpload: (eye: 'left' | 'right', dataUri: string) => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        setError("File is too large. Please select an image smaller than 4MB.");
        setPreview(null);
        return;
      }
      setError(null);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    if (preview) {
      onUpload(eye, preview);
    } else {
      setError("Please select an image first.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-lg text-muted-foreground">
        Please upload a clear photo of your <span className="font-bold text-primary">{eye} eye</span>.
      </p>
      <div 
        className="relative w-full max-w-md aspect-video bg-muted rounded-lg overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-primary"
        onClick={() => inputRef.current?.click()}
      >
        {preview ? (
          <Image src={preview} alt={`${eye} eye preview`} layout="fill" objectFit="contain" />
        ) : (
          <div className="text-center text-muted-foreground">
            <Upload className="h-12 w-12 mx-auto" />
            <p>Click to browse or drag & drop</p>
            <p className="text-xs">PNG, JPG, WEBP up to 4MB</p>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
        onChange={handleFileChange}
      />
      {error && <p className="text-destructive text-sm">{error}</p>}
      <div className="flex gap-4">
        <Button size="lg" variant="outline" onClick={() => inputRef.current?.click()}>
          <Upload className="mr-2 h-5 w-5" /> Change Photo
        </Button>
        <Button size="lg" onClick={handleConfirm} disabled={!preview}>
          <CheckCircle className="mr-2 h-5 w-5" /> Confirm and Continue
        </Button>
      </div>
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
  
  const getStatus = (analysis: string): {label: string, color: string, icon: React.ReactNode, severity: number } => {
    const lowerAnalysis = analysis.toLowerCase();
    if (lowerAnalysis.includes('severe') || lowerAnalysis.includes('advanced')) {
      return { label: 'Advanced', color: 'text-red-500', icon: <XCircle className="h-6 w-6 text-red-500" />, severity: 3 };
    }
    if (lowerAnalysis.includes('moderate')) {
        return { label: 'Moderate', color: 'text-orange-500', icon: <AlertTriangle className="h-6 w-6 text-orange-500" />, severity: 2 };
    }
    if (lowerAnalysis.includes('mild') || lowerAnalysis.includes('early')) {
      return { label: 'Mild', color: 'text-amber-500', icon: <AlertTriangle className="h-6 w-6 text-amber-500" />, severity: 1 };
    }
    if (lowerAnalysis.includes('no sign') || lowerAnalysis.includes('normal')) {
      return { label: 'Normal', color: 'text-green-500', icon: <CheckCircle className="h-6 w-6 text-green-500" />, severity: 0 };
    }
    return { label: 'Analysis Complete', color: 'text-muted-foreground', icon: <Eye className="h-6 w-6 text-muted-foreground" />, severity: 0 };
  }

  const leftEyeStatus = getStatus(result.leftEyeAnalysis);
  const rightEyeStatus = getStatus(result.rightEyeAnalysis);
  
  const chartData = [
    { eye: 'Left Eye', severity: leftEyeStatus.severity, fill: 'var(--color-left)' },
    { eye: 'Right Eye', severity: rightEyeStatus.severity, fill: 'var(--color-right)' },
  ];

  const chartConfig = {
    severity: { label: 'Severity' },
    left: { label: 'Left Eye', color: 'hsl(var(--chart-1))' },
    right: { label: 'Right Eye', color: 'hsl(var(--chart-2))' },
  };

  const handleDownload = () => {
    const reportContent = `
LumiSight AI Eye Screening Report
=================================
Date: ${new Date().toLocaleString()}

Overall Summary
-----------------
${result.summary}

Recommendations
-----------------
${result.recommendations}

Detailed Analysis
-----------------
Left Eye Status: ${leftEyeStatus.label} (${result.leftEyeAnalysis.includes('not') ? 'No Retinopathy Detected' : 'Retinopathy Detected'})
${result.leftEyeAnalysis}

Right Eye Status: ${rightEyeStatus.label} (${result.rightEyeAnalysis.includes('not') ? 'No Retinopathy Detected' : 'Retinopathy Detected'})
${result.rightEyeAnalysis}
`;
    const blob = new Blob([reportContent.trim()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'LumiSight-Eye-Screening-Report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
       <Card>
        <CardHeader>
          <CardTitle className="font-headline text-primary">Condition Severity</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData} margin={{ top: 20, left: -20, right: 20 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="eye" tickLine={false} tickMargin={10} axisLine={false} />
              <YAxis domain={[0, 4]} ticks={[0, 1, 2, 3]} tickFormatter={(value) => ['Normal', 'Mild', 'Moderate', 'Advanced'][value]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="severity" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6 text-center">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Left Eye</CardTitle>
            <CardDescription>{result.leftEyeAnalysis.includes('not') ? 'No Retinopathy Detected' : 'Retinopathy Detected'}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className={cn("text-2xl font-bold flex items-center justify-center gap-2", leftEyeStatus.color)}>{leftEyeStatus.icon} {leftEyeStatus.label}</div>
            <p className="text-sm text-muted-foreground">{result.leftEyeAnalysis}</p>

          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle className="font-headline">Right Eye</CardTitle>
            <CardDescription>{result.rightEyeAnalysis.includes('not') ? 'No Retinopathy Detected' : 'Retinopathy Detected'}</CardDescription>
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
      
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline text-primary flex items-center gap-2">
            <Lightbulb />
            Personalized Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line">{result.recommendations}</p>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-4 justify-center pt-4">
        <Button onClick={handleDownload}><Download className="mr-2 h-4 w-4" /> Download Full Report</Button>
        <Button variant="outline">Find Specialists</Button>
        <Button variant="outline">Set Reminders</Button>
        <Button variant="secondary" onClick={onReset}><RefreshCw className="mr-2 h-4 w-4" /> Start New Screening</Button>
      </div>
    </div>
  );
};
