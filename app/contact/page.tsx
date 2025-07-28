import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <Card className="w-full max-w-lg shadow-2xl border-none">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-white">Contact Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Your Name"
            className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-400"
          />
          <Input
            placeholder="Your Email"
            type="email"
            className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-400"
          />
          <Textarea
            placeholder="Your Message"
            className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-400"
            rows={5}
          />
          <Button className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 text-white hover:opacity-90 transition">
            Send Message
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
