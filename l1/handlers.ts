import {Dispatch, MutableRefObject, SetStateAction} from "react";

export function handlerOnClick(
    value: MutableRefObject<number>,
    setTitle: Dispatch<SetStateAction<string>>,
    textColors: string[]
) {
    value.current = (value.current + 1) % textColors.length;
    setTitle(textColors[value.current])
}