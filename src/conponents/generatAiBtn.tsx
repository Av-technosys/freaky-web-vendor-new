import { Button } from "@/components/ui"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Copy, Loader2, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner";

interface GenerateAiBtnProps {
    setLongDescription?: (text: string) => void;
}

export const GenerateAiBtn = ({ setLongDescription }: GenerateAiBtnProps) => {
    const shortDescription = useRef<HTMLInputElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedText, setGeneratedText] = useState("");

    function handleGenerateText() {
        const shortDesc = shortDescription.current?.value;
        if (!shortDesc) {
            toast.error("Please enter a short description first.");
            return;
        }

        setIsGenerating(true);
        setGeneratedText("");

        // Simulated AI generation with 2 second delay
        setTimeout(() => {
            setGeneratedText(data);
            setIsGenerating(false);
        }, 2000);
    }

    const handleCopy = () => {
        if (generatedText) {
            navigator.clipboard.writeText(generatedText);
            toast.success("Text copied to clipboard!");
        }
    }

    const handleUseThis = () => {
        if (generatedText && setLongDescription) {
            setLongDescription(generatedText);
            toast.success("Description updated!");
        }
    }

    return (
        <>
            <Dialog onOpenChange={(open) => {
                if (!open) {
                    setGeneratedText("");
                }
            }}
            >
                <DialogTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                        <Sparkles size={16} className="text-primary" />
                        Generate with AI
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Sparkles size={20} className="text-primary" />
                            Generate Description with AI
                        </DialogTitle>
                        <DialogDescription>
                            Please write a short description for the product.
                        </DialogDescription>
                    </DialogHeader>
                    <div className=" flex flex-col gap-4">
                        <InputGroup>
                            <InputGroupInput
                                placeholder="Short Description"
                                ref={shortDescription}
                                disabled={isGenerating}
                            />
                            <Button
                                onClick={handleGenerateText}
                                type="button"
                                disabled={isGenerating}
                                className=" float-right"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    "Generate"
                                )}
                            </Button>
                        </InputGroup>

                        <div className=" w-full min-h-32 border p-3 rounded-md relative bg-muted/30">
                            {isGenerating ? (
                                <div className="flex flex-col items-center justify-center h-24 text-muted-foreground">
                                    <Loader2 className="h-6 w-6 animate-spin mb-2" />
                                    <p>AI is thinking...</p>
                                </div>
                            ) : generatedText ? (
                                <div className="prose prose-sm dark:prose-invert max-h-64 overflow-y-auto pr-8">
                                    <pre className="whitespace-pre-wrap font-sans text-sm">
                                        {generatedText}
                                    </pre>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="absolute top-2 right-2 h-8 w-8"
                                        onClick={handleCopy}
                                    >
                                        <Copy size={16} />
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-24 text-muted-foreground text-sm italic">
                                    Generated text will appear here.
                                </div>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        {generatedText && (
                            <DialogClose asChild>
                                <Button onClick={handleUseThis} className="w-full">
                                    Use This Description
                                </Button>
                            </DialogClose>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

const data = `
### Experience the Rich Flavors of a Traditional North Indian Thali

Savor the essence of North India with a wholesome and beautifully curated North Indian Thali, a complete meal that brings together vibrant flavors, comforting textures, and time-honored recipes on a single platter. From festive gatherings to everyday indulgence, this thali celebrates abundance, balance, and tradition.

* 🍛 A Perfectly Balanced Platter
A North Indian thali is thoughtfully designed to include a variety of dishes—aromatic curries, fresh breads, fragrant rice, lentils, vegetables, pickles, and desserts—ensuring a harmonious mix of flavors and nutrition in every bite.

* 🫓 Freshly Prepared Indian Breads
Enjoy soft, warm rotis, buttery naan, or flaky parathas made fresh and served hot. These breads are perfect for scooping rich gravies and adding comfort to your meal.

* 🥘 Signature Curries & Dal
Indulge in classic favorites like paneer butter masala, dal makhani, chole, rajma, or seasonal vegetable curries. Each dish is slow-cooked with authentic spices that create depth and warmth.

* 🍚 Fragrant Rice & Accompaniments
Steamed basmati rice or jeera rice pairs beautifully with flavorful curries. The platter is completed with cooling raita, tangy pickles, crisp papad, and fresh salad for contrast.

* 🍮 Sweet Ending
No North Indian thali is complete without a traditional dessert such as gulab jamun, kheer, or halwa—adding a delightful and satisfying finish to the meal.

Celebrate the richness of Indian culinary heritage with a North Indian thali that offers comfort, variety, and unforgettable flavor in every serving.
`