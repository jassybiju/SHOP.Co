import { useMediaQuery } from "react-responsive"


export const useResponsive = () => {
    const isBigScreen = useMediaQuery({ query : `(min-width : 1824px)`})
    const isTab = useMediaQuery({query : '(max-width : 64rem)'})
    const isMobile = useMediaQuery({query : '(max-width : 412px)'})
    return {isBigScreen , isMobile , isTab}
}