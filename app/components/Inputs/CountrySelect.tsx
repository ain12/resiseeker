'use client';

import useCountries from '@/app/hooks/useCountries';
import Select from 'react-select';
import ReactCountryFlag from "react-country-flag";

export type CountrySelectValue =  {
    flag: string;
    label: string;
    latlng: number[];
    value: string;
    region: string;
}

interface CountrySelectProps {
    value?: CountrySelectValue;
    onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
    value,
    onChange,
}) => {
    const { getAllCountries } = useCountries();

    return (
        <div>
            <Select placeholder="Anywhere" isClearable options={getAllCountries()} 
            value={value} onChange={(value) => onChange(value as CountrySelectValue)} formatOptionLabel={(option: any) => (
                <div className='flex flex-row items-center gap-3'>
                    <ReactCountryFlag
                            className="w-[1em] h-[1em]"
                            countryCode={option.value}
                            svg
                            aria-label={option.label}
                        />
                    <div>
                        {option.label}
                        <span className="text-neutral-500 ml-1">
                            {option.region}
                        </span>
                    </div>
                </div>
            )} classNames={{ control: () => 'border-2 p-3', input: () => 'text-lg', option: () => 'text-lg'}}
            theme={(theme) => ({
                ...theme,
                borderRadius: 6,
                colors: {
                    ...theme.colors,
                    primary: 'black',
                    primary25: '#ffe4e6',
                }
            })}
            />
        </div>
    )
}

export default CountrySelect;