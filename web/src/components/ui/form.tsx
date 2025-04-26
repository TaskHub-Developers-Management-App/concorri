import { Divider } from '@heroui/react'
import { HTMLAttributes } from 'react'


interface FormHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode
}

export function FormHeading({ children, ...props }: FormHeadingProps) {
    return (
        <h1 className="text-xl font-semibold" {...props}>
            {children}
        </h1>
    )
}


interface FormDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    children: React.ReactNode
}

export function FormDescription({ children, ...props }: FormDescriptionProps) {
    return (
        <p className="text-small text-default-500" {...props}>
            {children}
        </p>
    )
}

interface FormHeaderProps {
    title: string;
    description: string;
}
export function FormHeader({ title, description }: FormHeaderProps) {
    return (
        <>
            <header className="flex gap-3">
                <div className="flex flex-col">
                    
                    <FormHeading>
                        {title}
                    </FormHeading>

                    <FormDescription>
                        {description}
                    </FormDescription>

                </div>
            </header>
            <Divider />
        </>
    )
}

interface FormErrorProps extends HTMLAttributes<HTMLParagraphElement> {
    children: React.ReactNode
}

export function FormError({ children, ...props }: FormErrorProps) {
    return (
        <p className="text-red-500 text-sm" {...props}>
            {children}
        </p>
    )
}