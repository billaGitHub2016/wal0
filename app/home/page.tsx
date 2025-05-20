import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ArrowRight,
  Code,
  Github,
  Layers,
  Rocket,
  Terminal,
  MessageSquare,
} from "lucide-react"

// Animated text component for the hero section
function AnimatedTitle({ text }: { text: string }) {
  return (
    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
      <span className="inline-block animate-fade-in-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
        AI-powered
      </span>{" "}
      <span className="inline-block animate-fade-in-up opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
        website
      </span>{" "}
      <span className="inline-block animate-fade-in-up opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards]">
        generator,
      </span>{" "}
      <span className="inline-block animate-fade-in-up opacity-0 [animation-delay:800ms] [animation-fill-mode:forwards] text-purple-500 dark:text-purple-400">
        decentralized
      </span>{" "}
      <span className="inline-block animate-fade-in-up opacity-0 [animation-delay:1000ms] [animation-fill-mode:forwards] text-purple-500 dark:text-purple-400">
        deployment
      </span>
    </h1>
  )
}

// Client component wrapper for the animated title
function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <AnimatedTitle text="AI-powered website generator, decentralized deployment" />
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Just enter a prompt, and walrus-v0 will generate a complete
                website for you. Debug online, then deploy to decentralized
                networks with a single click.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                size="lg"
                className="bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white"
              >
                Start Creating
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </div>
          </div>
          <div className="relative mx-auto aspect-video overflow-hidden rounded-xl border bg-background p-2 shadow-xl lg:order-last">
            <Image
              src="/placeholder.svg?height=550&width=550"
              width={550}
              height={550}
              alt="walrus-v0 interface preview"
              className="aspect-video rounded-md object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20 flex items-end p-6">
              <div className="w-full bg-background/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="flex items-center gap-2 text-sm text-purple-500 dark:text-purple-400 font-medium">
                  <Terminal className="h-4 w-4" />
                  <span>Enter prompt, AI generates website</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-6 w-6 text-purple-500 dark:text-purple-400" />
            <span className="text-xl font-bold">walrus-v0</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#examples"
              className="text-sm font-medium hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
            >
              Examples
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
            >
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Login
            </Link>
            <Button className="bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section - Client Component */}
        <HeroSection />

        {/* How It Works */}
        <section
          id="how-it-works"
          className="w-full py-12 md:py-24 lg:py-32 bg-purple-50 dark:bg-gray-900"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4">
                <div className="inline-block rounded-full bg-purple-100 dark:bg-purple-900/30 px-4 py-1.5 text-sm font-medium text-purple-700 dark:text-purple-300 uppercase tracking-wider">
                  How It Works
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400 dark:from-purple-400 dark:to-purple-300">
                    Three Steps to Build Your Website
                  </span>
                </h2>
                <div className="flex justify-center">
                  <div className="w-24 h-1.5 bg-gradient-to-r from-purple-600 to-purple-400 dark:from-purple-400 dark:to-purple-300 rounded-full"></div>
                </div>
                <p className="max-w-[900px] text-muted-foreground md:text-xl mt-4">
                  Simple steps to create and deploy websites with walrus-v0
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <div className="relative flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="absolute -top-3 -left-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-500 dark:bg-purple-600 text-white">
                  1
                </div>
                <MessageSquare className="h-12 w-12 text-purple-500 dark:text-purple-400" />
                <h3 className="text-xl font-bold">Enter a Prompt</h3>
                <p className="text-center text-muted-foreground">
                  Describe the type of website, functionality, and style you
                  want, and AI will understand your needs
                </p>
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  width={300}
                  height={200}
                  alt="Enter a prompt"
                  className="rounded-md border"
                />
              </div>
              <div className="relative flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="absolute -top-3 -left-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-500 dark:bg-purple-600 text-white">
                  2
                </div>
                <Code className="h-12 w-12 text-purple-500 dark:text-purple-400" />
                <h3 className="text-xl font-bold">Debug Online</h3>
                <p className="text-center text-muted-foreground">
                  After AI generates the website, you can preview and adjust it
                  online until you're satisfied
                </p>
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  width={300}
                  height={200}
                  alt="Debug online"
                  className="rounded-md border"
                />
              </div>
              <div className="relative flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="absolute -top-3 -left-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-500 dark:bg-purple-600 text-white">
                  3
                </div>
                <Rocket className="h-12 w-12 text-purple-500 dark:text-purple-400" />
                <h3 className="text-xl font-bold">One-Click Deploy</h3>
                <p className="text-center text-muted-foreground">
                  Click the deploy button, and your website will immediately go
                  live on the walrus decentralized network
                </p>
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  width={300}
                  height={200}
                  alt="One-click deploy"
                  className="rounded-md border"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Examples */}
        <section id="examples" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4">
                <div className="inline-block rounded-full bg-purple-100 dark:bg-purple-900/30 px-4 py-1.5 text-sm font-medium text-purple-700 dark:text-purple-300 uppercase tracking-wider">
                  Examples
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400 dark:from-purple-400 dark:to-purple-300">
                    Amazing Websites Created by Users
                  </span>
                </h2>
                <div className="flex justify-center">
                  <div className="w-24 h-1.5 bg-gradient-to-r from-purple-600 to-purple-400 dark:from-purple-400 dark:to-purple-300 rounded-full"></div>
                </div>
                <p className="max-w-[900px] text-muted-foreground md:text-xl mt-4">
                  See websites created by other users with walrus-v0 for
                  inspiration
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  width={400}
                  height={200}
                  alt="Example website 1"
                  className="aspect-video object-cover"
                />
                <CardHeader>
                  <CardTitle>Personal Portfolio</CardTitle>
                  <CardDescription>
                    Beautiful website for a photographer to showcase work
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View Website
                  </Button>
                </CardFooter>
              </Card>
              <Card className="overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  width={400}
                  height={200}
                  alt="Example website 2"
                  className="aspect-video object-cover"
                />
                <CardHeader>
                  <CardTitle>Restaurant Website</CardTitle>
                  <CardDescription>
                    Restaurant website with menu and online reservation
                    functionality
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View Website
                  </Button>
                </CardFooter>
              </Card>
              <Card className="overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  width={400}
                  height={200}
                  alt="Example website 3"
                  className="aspect-video object-cover"
                />
                <CardHeader>
                  <CardTitle>E-Commerce</CardTitle>
                  <CardDescription>
                    Online store for handcrafted items
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View Website
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="flex justify-center">
              <Button variant="outline">
                View More Examples
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="w-full py-12 md:py-24 lg:py-32 bg-purple-50 dark:bg-gray-900"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4">
                <div className="inline-block rounded-full bg-purple-100 dark:bg-purple-900/30 px-4 py-1.5 text-sm font-medium text-purple-700 dark:text-purple-300 uppercase tracking-wider">
                  FAQ
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400 dark:from-purple-400 dark:to-purple-300">
                    You Might Want to Know
                  </span>
                </h2>
                <div className="flex justify-center">
                  <div className="w-24 h-1.5 bg-gradient-to-r from-purple-600 to-purple-400 dark:from-purple-400 dark:to-purple-300 rounded-full"></div>
                </div>
                <p className="max-w-[900px] text-muted-foreground md:text-xl mt-4">
                  Frequently asked questions about walrus-v0
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-3xl gap-6 py-12">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Do I need programming knowledge to use walrus-v0?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    No. walrus-v0 is designed to be user-friendly for everyone,
                    regardless of your programming background. Simply describe
                    the website you want, and AI will generate the complete code
                    for you. Of course, if you know programming, you're free to
                    edit the generated code.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>
                    What are the advantages of decentralized deployment?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Decentralized deployment makes your website more secure and
                    reliable, not dependent on a single server. This means
                    higher availability, censorship resistance, and typically
                    lower maintenance costs. The walrus network ensures your
                    website is always online.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Can I use my own domain name?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Yes. While each project will get a walrus.app subdomain by
                    default, you can easily connect your own custom domain to
                    your walrus-v0 project.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>
                    What features do the generated websites support?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    walrus-v0 can generate websites with various features,
                    including but not limited to: static display pages, blogs,
                    portfolios, simple e-commerce websites, contact forms, etc.
                    As AI capabilities continue to improve, the supported
                    features are constantly expanding.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>
                    Can I modify my website after deployment?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Absolutely. You can return to the walrus-v0 platform at any
                    time to edit and update your website, then redeploy. All
                    changes will take effect immediately.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-purple-600 dark:bg-purple-800 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
                  Ready to Create Your Website?
                </h2>
                <div className="flex justify-center">
                  <div className="w-24 h-1.5 bg-white rounded-full"></div>
                </div>
                <p className="max-w-[600px] text-white/90 md:text-xl mt-4">
                  Just a few minutes from idea to launch, let AI make your
                  website dreams come true
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 dark:bg-white dark:text-purple-700"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-purple-700 dark:hover:bg-purple-700"
                >
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Layers className="h-6 w-6 text-purple-500 dark:text-purple-400" />
                <span className="text-xl font-bold">walrus-v0</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered website generator, one-click decentralized deployment
              </p>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-base font-medium">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Examples
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-base font-medium">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Support
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-base font-medium">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} walrus-v0. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
