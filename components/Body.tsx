import { FC, ReactNode } from "react";

export const Body: FC<{ children: ReactNode }> = (props) => {
    return (
        <div className='grow'>
            {props.children}
        </div>
    )
}