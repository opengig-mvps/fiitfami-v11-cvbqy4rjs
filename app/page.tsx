'use client' ;
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Image, Heart, Star, Share } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-light-green">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-green-100 to-green-200">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-green-800">
                    Welcome to Foodies Delight
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl text-green-700">
                    Discover and share amazing recipes, find culinary inspiration, and connect with fellow food enthusiasts.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="h-10 bg-green-600 text-white px-8 hover:bg-green-700">Get Started</Button>
                  <Button className="h-10 border border-green-600 text-green-600 px-8 hover:bg-green-100">Learn More</Button>
                </div>
              </div>
              <img
                src="https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-green-800">Popular Recipes</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-green-700">
                  Explore trending recipes shared by our community of food lovers.
                </p>
              </div>
            </div>
            <Carousel>
              <CarouselContent>
                <CarouselItem>
                  <img src="https://picsum.photos/seed/picsum/200/300" alt="Recipe 1" className="rounded-md"/>
                </CarouselItem>
                <CarouselItem>
                  <img src="https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY" alt="Recipe 2" className="rounded-md"/>
                </CarouselItem>
                <CarouselItem>
                  <img src="https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s" alt="Recipe 3" className="rounded-md"/>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-200 to-green-300">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-green-800">User Testimonials</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-green-700">
                  Hear from our happy users who found their culinary inspiration on Foodies Delight.
                </p>
              </div>
              <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <Card className="flex flex-col items-start space-y-4 p-6">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/picsum/200/300" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none text-green-800">John Doe</p>
                      <p className="text-xs text-green-600">Food Blogger</p>
                    </div>
                  </div>
                  <p className="text-green-700">
                    "Foodies Delight has transformed the way I discover new recipes and share my own culinary creations."
                  </p>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/picsum/200/300" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none text-green-800">Sarah Miller</p>
                      <p className="text-xs text-green-600">Home Chef</p>
                    </div>
                  </div>
                  <p className="text-green-700">
                    "I love the community aspect of Foodies Delight. Connecting with other food enthusiasts is a joy!"
                  </p>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/picsum/200/300" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none text-green-800">Michael Johnson</p>
                      <p className="text-xs text-green-600">Culinary Student</p>
                    </div>
                  </div>
                  <p className="text-green-700">
                    "The endless stream of delicious recipes keeps me inspired and eager to try new dishes."
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-green-800">Join Our Community</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-green-700">
                  Sign up now and become a part of the Foodies Delight family. Share your recipes, get inspired, and connect with fellow food lovers.
                </p>
              </div>
              <Button className="h-10 bg-green-600 text-white px-8 hover:bg-green-700">Sign Up</Button>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-100 to-green-200">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Tabs defaultValue="features" className="w-full">
                  <TabsList>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="pricing">Pricing</TabsTrigger>
                    <TabsTrigger value="faq">FAQ</TabsTrigger>
                  </TabsList>
                  <TabsContent value="features">
                    <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-green-800">Discover Recipes</CardTitle>
                          <CardDescription className="text-green-600">Find and save your favorite recipes.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Image className="h-8 w-8 text-green-600" />
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-green-800">Share Creations</CardTitle>
                          <CardDescription className="text-green-600">Post your own recipes and photos.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Share className="h-8 w-8 text-green-600" />
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-green-800">Get Inspired</CardTitle>
                          <CardDescription className="text-green-600">Explore trending and new recipes.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Star className="h-8 w-8 text-green-600" />
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  <TabsContent value="pricing">
                    <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-green-800">Free Plan</CardTitle>
                          <CardDescription className="text-green-600">Access basic features with ads.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold text-green-800">$0</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-green-800">Pro Plan</CardTitle>
                          <CardDescription className="text-green-600">Unlock all features and remove ads.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold text-green-800">$9.99/mo</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-green-800">Enterprise Plan</CardTitle>
                          <CardDescription className="text-green-600">Best for large teams and organizations.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold text-green-800">$49.99/mo</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  <TabsContent value="faq">
                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-green-800">What is Foodies Delight?</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-green-700">Foodies Delight is a social media platform dedicated to food lovers and culinary enthusiasts.</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-green-800">How can I join?</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-green-700">Simply sign up on our website and start sharing your recipes and exploring others.</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-green-800">Is there a premium plan?</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-green-700">Yes, we offer Pro and Enterprise plans that unlock additional features and remove ads.</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-green-400 p-6 md:py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold text-green-800">Product</h3>
            <a href="#" className="text-green-700">Features</a>
            <a href="#" className="text-green-700">Integrations</a>
            <a href="#" className="text-green-700">Pricing</a>
            <a href="#" className="text-green-700">Security</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold text-green-800">Company</h3>
            <a href="#" className="text-green-700">About Us</a>
            <a href="#" className="text-green-700">Careers</a>
            <a href="#" className="text-green-700">Blog</a>
            <a href="#" className="text-green-700">Contact</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold text-green-800">Resources</h3>
            <a href="#" className="text-green-700">Documentation</a>
            <a href="#" className="text-green-700">Help Center</a>
            <a href="#" className="text-green-700">Community</a>
            <a href="#" className="text-green-700">Templates</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold text-green-800">Legal</h3>
            <a href="#" className="text-green-700">Privacy Policy</a>
            <a href="#" className="text-green-700">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;