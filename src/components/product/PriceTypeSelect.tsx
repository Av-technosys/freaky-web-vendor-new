import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    FieldTitle,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
type Props = {
  selectedValue: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export function ProductPriceTypeRadio({ selectedValue, onChange, disabled }: Props) {
    return (
   
          <RadioGroup
            value={selectedValue}
            onValueChange={(value) => {
                if (disabled) return;
                onChange(value);
            }}
            className={`w-full grid grid-cols-2 gap-4 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            <FieldLabel htmlFor="flat-plan">
                <Field orientation="horizontal">
                    <FieldContent>
                        <FieldTitle>Flat</FieldTitle>
                        <FieldDescription>
                            Fixed price for the service.
                        </FieldDescription>
                    </FieldContent>
                    <RadioGroupItem value="FLAT" id="flat-plan" />
                </Field>
            </FieldLabel>
            <FieldLabel htmlFor="tire-plan">
                <Field orientation="horizontal">
                    <FieldContent>
                        <FieldTitle>Tier</FieldTitle>
                        <FieldDescription>Price based on tier size.</FieldDescription>
                    </FieldContent>
                    <RadioGroupItem value="TIER" id="tire-plan" />
                </Field>
            </FieldLabel>
        </RadioGroup>
    )

}
