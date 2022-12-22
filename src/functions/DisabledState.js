import { atom, useAtom } from "react-atomic-state";

//This enables state management for forms (enabled/disabled)
//you must call this from a fieldset for each form on the site

const formStatus = atom(false);
export const disableForm = () => formStatus.set(true);
export const enableForm = () => formStatus.set(false);
export const useFormStatus = () => useAtom(formStatus);

//The below is used when a tx has been successfully completed and can be used to refresh data in a useEffect

const stateChanged = atom(false);
export const changeState = () => {
    
    if (stateChanged.get() === true)
        stateChanged.set(false)
    else
        stateChanged.set(true)
}

export const useStateChanged = () => useAtom(stateChanged);