import { RefObject } from "react";

export class DisplayModalClass {
    _modal: RefObject<HTMLDialogElement>;

    constructor(modal: RefObject<HTMLDialogElement>) {
        this._modal = modal;
    }

    openModal() {
        this._modal?.current.showModal();
    }

    closeModal() {
        this._modal?.current.close();
    }
}
