"use client";
import { useMemo, useState } from "react";
import { useFloating, offset, flip, shift, useClick, useDismiss, useInteractions } from "@floating-ui/react";
import { ChevronDown } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@lib/redux/store";
import { setLocale, setCurrency } from "@lib/redux/base";
import useLocale from "@hooks/useLocale";
import useCurrency from "@hooks/useCurrency";
import useDirection from '@hooks/useDirection'
import { useChangeLocale } from "@src/utils/changeLocale";
function Dropdown({ label, items, value, onChange }: {
    label: string;
    items: Record<string, string>[]
    value: string;
    onChange: (val: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const val = items?.find((item) => item.code === value)?.name;
    const { refs, floatingStyles, context } = useFloating({
        open,
        onOpenChange: setOpen,
        middleware: [offset(6), flip(), shift()],
    });

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

    return (
        <div className="relative">
            <button
                ref={refs.setReference}
                {...getReferenceProps()}
                className="flex items-center gap-1 text-travel-gray-600"
            >
                <span>{val}</span>
                <ChevronDown className="w-3 h-3" />
            </button>

            {open && (
                <div
                    ref={refs.setFloating}
                    style={floatingStyles}
                    {...getFloatingProps()}
                    className="z-50 min-w-40 rounded-md bg-white shadow-md border border-gray-200 py-2"
                >
                    {items?.map((item) => (
                        <button
                            key={item.code}
                            className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
                            onClick={() => {
                                onChange(item.code);
                                setOpen(false);
                            }}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function LocaleCurrencySelectors() {
    const rawLanguages = useAppSelector(state => state.appData?.data?.languages);
    const rawCurrencies = useAppSelector(state => state.appData?.data?.currencies);

    const locales = useMemo(
        () =>
            rawLanguages
                ?.filter((lang: any) => lang?.status === "1")
                ?.map((lang: any) => ({ name: lang.name, code: lang.language_code })),
        [rawLanguages]
    );

    const currencies = useMemo(
        () =>
            rawCurrencies
                ?.filter((curr: any) => curr?.status === "1")
                ?.map((curr: any) => ({ name: curr.name, code: curr.iso.toLocaleLowerCase() })),
        [rawCurrencies]
    );


    const dispatch = useAppDispatch();
    const { locale } = useLocale();
    const { currency } = useCurrency();
    const [direction, setDirectionHandler] = useDirection();
    const changeLocale = useChangeLocale();
    const handleLanguageChange = (value: string) => {
        if (value) {
            dispatch(setLocale(value))
            changeLocale(value)
        }
        if (value === 'ar') {
            setDirectionHandler('rtl')
        } else {
            setDirectionHandler('ltr')
        }
    }

    return (
        <div className="flex items-center gap-4 text-travel-gray-600">
            <Dropdown label="Locale" items={locales} value={locale} onChange={(v: string) => handleLanguageChange(v.toLocaleLowerCase())} />
            <Dropdown label="Currency" items={currencies} value={currency} onChange={(v: string) => dispatch(setCurrency(v.toLocaleLowerCase()))} />
        </div>
    );
}
