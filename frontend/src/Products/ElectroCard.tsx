import { useState } from "react";
import { Button } from "../components/ui/button";
import { CpuIcon, BatteryIcon, DiscIcon, StarIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import Navbar from "@/Navbar/Navbar";


export default function ElectronicsProductDetails({ hideLearnMore, info }: { hideLearnMore?: boolean, info:any }) {
  const [showMore, setShowMore] = useState(false);

  const handleLearnMore = () => {
    setShowMore(prev => !prev);
  };

  return (
    <div className="bg-background text-foreground">
      <Navbar/>
      <section className="container mx-auto py-12 md:py-20 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <img
            src={info.imageUrl || "/placeholder.svg"}
            alt={info.name}
            width={600}
            height={600}
            className="w-full rounded-lg"
            style={{ aspectRatio: "400/200", objectFit: "contain" }}
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{info.name}</h1>
          <p className="text-muted-foreground">
            Experience unparalleled performance and portability with the {info.name}.
          </p>
          <p className="text-xl font-bold">Price: {info.price}</p>
          <p>Additional Info: {info.name}</p>
          <div className="flex items-center gap-4">
            <Button className="bg-yellow-500 hover:bg-yellow-600" size="lg">Add to Cart</Button>
            {
              !hideLearnMore && (
                <button onClick={handleLearnMore} className="text-primary hover:underline">
                  {showMore ? "Show Less" : "Learn More"}
                </button>
              )
            }
          </div>
        </div>
      </section>

      {showMore && (
        <>
          <section className="bg-muted py-12 md:py-20">
            <div className="container mx-auto space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold">Key Features</h2>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  Discover the innovative features that make the Acme Ultrabook Pro the ultimate productivity companion.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-background p-6 rounded-lg shadow-sm">
                  <CpuIcon className="w-8 h-8 mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">Powerful Performance</h3>
                  <p className="text-muted-foreground">
                    Equipped with the latest Intel Core processors, the Acme Ultrabook Pro delivers lightning-fast
                    performance for all your computing needs.
                  </p>
                </div>
                <div className="bg-background p-6 rounded-lg shadow-sm">
                  <BatteryIcon className="w-8 h-8 mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">Long-Lasting Battery</h3>
                  <p className="text-muted-foreground">
                    Enjoy extended productivity with the Acme Ultrabook Pro's high-capacity battery, providing up to 12
                    hours of use on a single charge.
                  </p>
                </div>
                <div className="bg-background p-6 rounded-lg shadow-sm">
                  <DiscIcon className="w-8 h-8 mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">Stunning Display</h3>
                  <p className="text-muted-foreground">
                    Experience vibrant colors and crisp details on the Acme Ultrabook Pro's high-resolution display, perfect
                    for work, entertainment, and more.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="container mx-auto py-12 md:py-20 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Technical Specifications</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Dive into the technical details that make the Acme Ultrabook Pro a powerhouse.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4">Hardware</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <span className="font-medium">Processor:</span> 11th Gen Intel Core i7-1165G7
                  </li>
                  <li>
                    <span className="font-medium">RAM:</span> 16GB LPDDR4X
                  </li>
                  <li>
                    <span className="font-medium">Storage:</span> 512GB SSD
                  </li>
                  <li>
                    <span className="font-medium">Display:</span> 14" FHD IPS (1920x1080)
                  </li>
                  <li>
                    <span className="font-medium">Graphics:</span> Intel Iris Xe Graphics
                  </li>
                </ul>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4">Software</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <span className="font-medium">Operating System:</span> Windows 11 Home
                  </li>
                  <li>
                    <span className="font-medium">Connectivity:</span> Wi-Fi 6, Bluetooth 5.1
                  </li>
                  <li>
                    <span className="font-medium">Ports:</span> 2x USB-C, 1x USB-A, HDMI, 3.5mm audio
                  </li>
                  <li>
                    <span className="font-medium">Security:</span> Fingerprint reader, TPM 2.0
                  </li>
                  <li>
                    <span className="font-medium">Webcam:</span> 720p HD
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-muted py-12 md:py-20">
            <div className="container mx-auto space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold">Customer Reviews</h2>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  See what our customers have to say about the Acme Ultrabook Pro.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-background p-6 rounded-lg shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <img src="/placeholder.svg" alt="Avatar" className="w-12 h-12 rounded-full" />
                    <div>
                      <h4 className="font-bold">John Doe</h4>
                      <div className="flex items-center gap-1 text-primary">
                        <StarIcon className="w-5 h-5" />
                        <StarIcon className="w-5 h-5" />
                        <StarIcon className="w-5 h-5" />
                        <StarIcon className="w-5 h-5" />
                        <StarIcon className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "The Acme Ultrabook Pro is an absolute powerhouse! I've been using it for work and personal tasks, and
                    it's been a game-changer. The performance is incredible, and the battery life is unbelievable. Highly recommended!"
                  </p>
                </Card>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}