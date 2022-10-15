import { useState } from "react";
// import { CloseButton } from "../CloseButton";

import bugImage from '../../assets/bug.svg';
import ideaImage from '../../assets/idea.svg';
import thoughtImage from '../../assets/thought.svg';
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";


export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImage,
      alt: 'Imagem de um inseto',
    }
  },
  IDEA: {
    title: 'Ideia',
    image: {
        source: ideaImage,
        alt: 'Imagem de uma lâmpada',
      }
  },
  OTHER: {
    title: 'other',
    image: {
        source: thoughtImage,
        alt: 'Imagem de um balão de pensamento',
      }
  },
}

// Object.entries(feedbackTypes) =>

/**
 * [
 *    ['BUG', {...}],
 *    ['IDEA', {...}],
 *    ['THOUGHT', {...}],
 * ]
 */

export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm() {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
    const [feedbackSent, setFeedbackSent] = useState(false);

    function handleRestartFeedback() {
      setFeedbackSent(false);
      setFeedbackType(null);
    }
    // Essa função limpa meu estado de feedbackType, voltando a mostrar meu componente
    // de feedbackType, e não o componente de conteúdo em si.


    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

          { feedbackSent ? (
            <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback}/>
          ) : (
            <>
                        {!feedbackType ? (
               <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType}/> 
               // Cria-se para enviar a função set por props.            
            ) : (
            <FeedbackContentStep
             feedbackType={feedbackType}
             onFeedbackRestartRequested={handleRestartFeedback}
             onFeedbackSent={() => setFeedbackSent(true)}
            />
            )}
            </>
          )}



            <footer className="text-xs text-neutral-400">
                Feito com ♥ pela <a className="underline-offset-2" href="https://google.com.br">Rocketseat</a>
            </footer>
        </div>
    )
}