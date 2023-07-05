'use client';

import { Range } from "react-date-range";
import Calendar from "../Inputs/Calendar";
import Button from "../Button";

interface ListingReservationProps {
    price: number;
    dateRange: Range;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
    price,
    dateRange,
    totalPrice,
    onChangeDate,
    onSubmit,
    disabled,
    disabledDates,
}) => {
    return (
        <div className="bg-white border-[1px] rounded-xl overflow-hidden border-neutral-200">
            <div className="flex flex-row items-center p-4 gap-1">
                <div className="text-2xl font-semibold">
                    {price} €
                </div>
                <div className="text-neutral-600 font-light">
                    /night
                </div>
            </div>
            <hr />
            <Calendar value={dateRange} disabledDates={disabledDates} onChange={(value) => onChangeDate(value.selection)} />
            <hr />
            <div className="p-4">
                <Button label="Reserve" disabled={disabled} onClick={onSubmit}/>
            </div>
            <div className="flex flex-row items-center justify-between p-4 font-semibold text-lg">
                <div>
                    Total
                </div>
                <div>
                    {totalPrice} €
                </div>
            </div>
        </div>
    )
}

export default ListingReservation;