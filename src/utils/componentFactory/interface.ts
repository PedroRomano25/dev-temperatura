type IComponentProp<IProps, IRef> = (
    props: IProps,
    ref: React.ForwardedRef<IRef>
) => JSX.Element;
type IComponent<IProps, IRef> = React.MemoExoticComponent<
    React.ForwardRefExoticComponent<
        React.PropsWithoutRef<IProps> & React.RefAttributes<IRef>
    >
>;
export type IComponentFactory = <IProps, IRef = any>(
    componentName: string,
    component: IComponentProp<IProps, IRef>
) => IComponent<IProps, IRef>;
