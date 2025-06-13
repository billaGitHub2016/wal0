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
import { ThemeToggle } from "@/components/biz/ThemeToggle"

// Animated text component for the hero section
function AnimatedTitle({ text }: { text: string }) {
  return (
    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
      <span className="inline-block animate-fade-in-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
        Use <span className="text-purple-500 dark:text-purple-400">Wal0</span>{" "}
      </span>{" "}
      <span className="inline-block animate-fade-in-up opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
        to publish
      </span>{" "}
      <span className="inline-block animate-fade-in-up opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards]">
        your first
      </span>{" "}
      <span className="inline-block animate-fade-in-up opacity-0 [animation-delay:800ms] [animation-fill-mode:forwards] underline">
        <Link href="https://wal.app/" target="_blank">
          Walrus Site
        </Link>
        .
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
                Just enter a prompt, and Wal0 will generate a complete website
                for you. Debug online, then deploy to Walrus with a single
                click.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/main">
                <Button
                  size="lg"
                  className="bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white"
                >
                  Start Creating
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative mx-auto aspect-video overflow-hidden rounded-xl border bg-background p-2 shadow-xl lg:order-last">
            <Image
              src="/overview.png?height=550&width=550"
              width={550}
              height={550}
              alt="Wal0 interface preview"
              className="rounded-md object-cover"
            />
            <div className="absolute flex items-end p-1">
              <div className="w-full bg-background/95 backdrop-blur-sm rounded-lg p-2 shadow-lg">
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
            <span className="text-xl font-bold">Wal0</span>
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
            <ThemeToggle />
            <Link href="/main">
              <Button className="bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white">
                Get Started
              </Button>
            </Link>
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
                  Simple steps to create and deploy websites with Wal0
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
                  src="/promot.png"
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
                  src="/debug.png"
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
                  src="/publish.png?height=200&width=300"
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
                  See websites created by other users with Wal0 for inspiration
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="overflow-hidden">
                <Image
                  src="/profile.png?height=200&width=400"
                  width={400}
                  height={200}
                  alt="Example website 1"
                  className="aspect-video object-cover"
                />
                <CardHeader>
                  <CardTitle>Personal Portfolio</CardTitle>
                  <CardDescription>Person introduction</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link
                    href="http://4jct0asvysooqni037wuofypuu7oa41z4rlu5oekoo11i3cwdp.wal.billa4161.xyz"
                    target="_blank"
                  >
                    <Button variant="outline" size="sm" className="w-full">
                      View Website
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="overflow-hidden">
                <Image
                  src="/shop.png?height=200&width=400"
                  width={400}
                  height={200}
                  alt="Example website 2"
                  className="aspect-video object-cover"
                />
                <CardHeader>
                  <CardTitle>E-Commerce</CardTitle>
                  <CardDescription>Online store</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link
                    href="http://30cf4d4bsut8l1t0y2nndxvfjat8gls51b589m3kal3o10bxez.wal.billa4161.xyz"
                    target="_blank"
                  >
                    <Button variant="outline" size="sm" className="w-full">
                      View Website
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="overflow-hidden">
                <Image
                  src="/game.png?height=200&width=400"
                  width={400}
                  height={200}
                  alt="Example website 3"
                  className="aspect-video object-cover"
                />
                <CardHeader>
                  <CardTitle>Game</CardTitle>
                  <CardDescription>Minesweeper game</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link
                    href="http://3pzcifwdu1m04b5j54attzwqd6wun9h51kh1zbxg75ozdthdsr.wal.billa4161.xyz"
                    target="_blank"
                  >
                    <Button variant="outline" size="sm" className="w-full">
                      View Website
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
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
                  Frequently asked questions about Wal0
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-3xl gap-6 py-12">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Do I need programming knowledge to use Wal0?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    No. Wal0 is designed to be user-friendly for everyone,
                    regardless of your programming background. Simply describe
                    the website you want, and AI will generate the complete code
                    for you. Of course, if you know programming, you're free to
                    edit the generated code.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pricing Model</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    New users receive a complimentary $1 credit for generating
                    web code with AI models. Deposit SUI coins via smart
                    contracts, and your balance will convert to a USD equivalent
                    based on the exchange rate at the time of deposit for AI
                    model usage. There's no limit on the SUI deposit amount, and
                    you can withdraw your balance through smart contracts.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>
                    Do I own the Walrus site I publish in my wallet?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Yes, Wal0 can transfer ownership of the Walrus site to your
                    wallet, but you need to pay the gas fee. You can experience
                    the transfer process without gas fees on the testnet.
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
                    Absolutely. You can return to the Wal0 platform at any time
                    to edit and update your website, then redeploy. All changes
                    will take effect immediately.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t pb-6">
        <div className="pt-8 flex flex-col md:flex-row justify-center items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Wal0. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0"></div>
        </div>
      </footer>
    </div>
  )
}
