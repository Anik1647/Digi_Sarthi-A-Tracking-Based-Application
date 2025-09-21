import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Tracking from "@/pages/tracking";
import DriverApp from "@/pages/driver-app";
import Signup from "@/pages/signup";
import Navigation from "@/components/navigation";
import SpaceBackground from "@/components/space-background";
import { ThemeProvider } from "@/components/theme-provider";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/tracking" component={Tracking} />
      <Route path="/driver-app" component={DriverApp} />
      <Route path="/signup" component={Signup} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <div className="min-h-screen relative bg-background text-foreground">
            <Navigation />
            <main>
              <Router />
            </main>
            <Toaster />
          </div>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
