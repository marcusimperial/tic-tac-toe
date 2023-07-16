import { ColorRing } from "react-loader-spinner";
import { useApp } from "./Context";
import { useState } from "react";

const Utilities = () => {

    const { utility, setUtility } = useApp();
    const [value, setValue] = useState('');

    const onConfirm = async () => {
        utility?.resolve(true);
        setUtility({ active: false });
    };

    const onCancel = async () => {
        utility?.resolve(false);
        setUtility({ active: false });
    };

    const onChange = (e) => {
        if (typeof e.target.value !== 'string') return;
        setValue(e.target.value);
    };

    const onSubmit = async () => {
        utility?.resolve(value);
        setValue('');
        setUtility({ active: false });
    };

    // input, confirm
    return (
        <div className={`grid bg-[url('bg.jpg')] items-center justify-items-center ${utility?.active ? 'h-full' : 'h-0'} overflow-hidden fixed top-0 bottom-0 left-0 right-0`}>  
            {
                (utility?.type === 'load') &&
                <div className="grid items-center justify-items-center">
                    <ColorRing visible={true} height="300" width="300" colors={['#FEFEFE', '#6E668F', '#64346F', '#012768']} />
                    <h1 className="text-5xl text-white">{utility?.message}</h1>
                </div>
            }
            {
                (utility?.type === 'confirm') &&
                <div className="grid items-center justify-items-center gap-2">
                    <h1 className="text-5xl md:text-6xl text-white text-center">{utility?.message}</h1>
                    <div className="grid md:grid-cols-2 gap-2 items-center justify-items-center">
                        <div onClick={onConfirm} className="flex items-center bg-pink text-white rounded-lg p-2 hover:scale-[.98] select-none">
                            <h1 className="text-3xl md:text-4xl">Confirm</h1>
                        </div>
                        <div onClick={onCancel} className="flex items-center border-2 border-white text-white rounded-lg p-2 hover:scale-[.98] select-none">
                            <h1 className="text-3xl md:text-4xl">Cancel</h1>
                        </div>
                    </div>
                </div>
            }
            {
                (utility?.type === 'prompt') &&
                <div className="grid items-center justify-items-center gap-2">
                    <h1 className="text-5xl md:text-6xl text-white text-center">{utility?.message}</h1>
                    <input type="text" value={value} onChange={onChange} className="outline-none text-4xl text-white text-center bg-transparent border-b-2" />
                    <div onClick={onSubmit} className="flex items-center bg-pink text-white rounded-lg p-2 hover:scale-[.98] select-none">
                        <h1 className="text-3xl md:text-4xl">Let's go!</h1>
                    </div>
                </div>
            }
        </div>
    )
};

export default Utilities;