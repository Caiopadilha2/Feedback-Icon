import { useState } from "react";
import { Camera, Trash } from "phosphor-react";
import html2canvas from "html2canvas";
import { Loading } from "../../Loading";

interface ScreenshotButtonProps {
  onScreenshotTook: (screenshot: string | null) => void;
  screenshoot: string | null;
}

export function ScreenshotButton({ screenshoot, onScreenshotTook }: ScreenshotButtonProps) {
    const [isTakingScreenshot, setIsTakingScreenshot ] = useState(false);

    async function handleTakeScreenshot() {
    setIsTakingScreenshot(true);

    const canvas = await html2canvas(document.querySelector('html')!)
    const base64image = canvas.toDataURL('image/png')

    onScreenshotTook(base64image);

    // console.log(base64image)
    setIsTakingScreenshot(false);
  }

    if(screenshoot) {
      return (
        <button 
          type="button"
          className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
          style={{
            backgroundImage: `url(${screenshoot})`,
            backgroundPosition: 'right bottom',
            backgroundSize: 180,
            // Como o HTML da página só tem isso do cantinho, ta pedindo pra pegar só desse canto senão ela nem aparece direito.
          }}
          
        >
          <Trash 
          weight="fill"
          onClick={() => onScreenshotTook(null)} 
          />
        </button>
      )
    }

    return (
        <button
        type="button"
        className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
        onClick={handleTakeScreenshot}
      >
        { isTakingScreenshot ? <Loading /> : <Camera className="h-6 w-6 text-zinc-100"/>}

      </button>
    )
}