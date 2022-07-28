import Link, {LinkProps} from 'next/link';
import { cloneElement, ReactElement } from 'react';
import { useRouter } from 'next/router'


interface ActiveLinkProps extends LinkProps{
    children:ReactElement,
    activeClassName: string
}


export function ActiveLink({children, activeClassName, ...rest}: ActiveLinkProps){
    const { asPath } = useRouter(); //se ele estiver na página, acessa qual o caminho

    const className = asPath === rest.href ? activeClassName: '';

    return(
        <Link {...rest}>
            {cloneElement(children,{
                className
            })}
        </Link>
    )
};