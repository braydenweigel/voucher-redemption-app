import { Theme, useTheme } from "@/lib/hooks/use-theme-context"
import { Check } from "lucide-react-native"
import { useState } from "react"
import { ViewProps, PressableProps, Pressable, StyleSheet, StyleProp, ViewStyle } from "react-native"

type CheckboxProps = PressableProps & {
    checked: boolean
    setChecked: React.Dispatch<React.SetStateAction<boolean>>
    style?: StyleProp<ViewStyle>

}

export default function Checkbox({checked, setChecked, style, ...props}: CheckboxProps){
    const { theme } = useTheme()
    const styles = getStyles(theme)

    const handleClick = () => {
        setChecked(!checked)
    }

    return (
        <Pressable style={[styles.box, (checked ? styles.checked : styles.unchecked), style]} onPress={handleClick} {...props}> 
            {checked ? <Check color={"#fafaf9"} size={20}/> : null}
        </Pressable>
    )
}

function getStyles(theme: Theme){
    return StyleSheet.create({
        box: {
            width: 20,
            height: 20,
            borderRadius: 4, 
            borderWidth: 1
        },
        unchecked: {
            backgroundColor: theme.input,
            borderColor: theme.background_secondary
        }, 
        checked: {
            backgroundColor: theme.accent_primary,
            borderColor: theme.accent_secondary
        }
    })
}