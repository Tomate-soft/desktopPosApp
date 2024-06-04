import { ActionsKeyboard } from "../../../mainKeyboard/actionKeyboard";
import styles from "./moreActionsMenu.module.css";
import { actionsMenu, actionsTogoMenu } from "./configs/options";
import { useState } from "react";
import {
  BILL_CANCEL,
  BILL_DISCOUNTS,
  BILL_NAME,
  COMMENTS,
  COURTESY_APPLY_BILL,
  COURTESY_APPLY_NOTES,
  COURTESY_APPLY_PRODUCTS,
  MOVE_PRODUCTS,
  MOVE_TABLE,
  NOTES_CANCEL,
  NOTES_DISCOUNTS,
  NOTES_NAME,
  PRODUCTS_CANCEL,
  PRODUCTS_DISCOUNTS,
  SEPARATE_CHECKS,
} from "./configs/constants";
import tomateIcon from "../../../../assets/icon/tomatePOSlogo.svg";
import UseAccount from "../../../../hooks/useAccount";
import { useModal } from "../../../../hooks/useModal";
import ConfirmChanges from "../../../modals/confirm/confirmChanges";
import { CONFIRM_ACTIONS } from "../../../../configs/consts";
import SeparateChecks from "../../../separateChecks/separateChecks";
import TransferProducts from "../../../transferProducts/transferProducts";
import MoveTable from "../../../moveTable/moveTable";
import ProductsDiscounts from "../../../discounts/productsDiscounts/productsDiscounts";
import NotesDiscounts from "../../../discounts/notesDiscounts/notesDiscounts";
import BillDiscount from "../../../discounts/billDiscounts/billDiscounts";
import ProductsCourtesy from "../../../courtesy/productsCourtesy/productCourtesy";
import NotesCourtesy from "../../../courtesy/notesCourtesy/notesCourtesy";
import NotesCancellation from "../../../cancellations/noteCancellation/noteCancellation";
import ProductsCancel from "../../../cancellations/productCancellation/productCancellation";
import { ON_SITE_ORDER, TO_GO_ORDER } from "../../../../lib/orders.lib";
import { UseActions } from "../../../../store/moreActions/moreActions.store";
interface Props {
  isOpen: any;
  onClose: any;
  item: any;
  type: string;
}

export default function MoreActionsMenu({ onClose, item, type }: Props) {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [petition, setPetition] = useState(false);
  const accountProps = UseAccount();

  const updateCommentBill = UseActions((state) => state.updateComments);
  const cancelBill = UseActions((state) => state.cancelBill);
  const isLoading = UseActions((state) => state.isLoading);
  const updateNameNote = UseActions((state) => state.updateNameInNote);
  const errors = UseActions((state) => state.errors);
  const updateNameBill = UseActions((state) => state.updateName);
  const createDiscount = UseActions((state) => state.createDiscount);

  const confirmChanges = useModal(CONFIRM_ACTIONS);

  return (
    <main className={styles.screen}>
      {confirmChanges.isOpen && confirmChanges.modalName === CONFIRM_ACTIONS ? (
        <ConfirmChanges
          loading={isLoading}
          errors={errors}
          isOpen={confirmChanges.isOpen}
          onClose={confirmChanges.closeModal}
        >
          Cambios guardados
        </ConfirmChanges>
      ) : null}
      {!confirmChanges.isOpen && (
        <section className={styles.modal}>
          <button className={styles.closeButton} onClick={onClose}>
            X
          </button>
          <div className={styles.actionsContainer}>
            {
              /* type && */ type === ON_SITE_ORDER &&
                actionsMenu.map((element, index) => (
                  <>
                    <button
                      key={index}
                      style={
                        selectedOption === element.set
                          ? { background: "white", color: "#000" }
                          : {}
                      }
                      onClick={() => {
                        setSelectedOption(element.set);
                      }}
                    >
                      {element.option}
                    </button>
                  </>
                ))
            }
            {
              /* type && */ type === TO_GO_ORDER &&
                actionsTogoMenu.map((element, index) => (
                  <>
                    <button
                      key={index}
                      style={
                        selectedOption === element.set
                          ? { background: "white", color: "#000" }
                          : {}
                      }
                      onClick={() => {
                        setSelectedOption(element.set);
                      }}
                    >
                      {element.option}
                    </button>
                  </>
                ))
            }
          </div>
          {selectedOption === BILL_NAME ? (
            <>
              <ActionsKeyboard
                option={selectedOption}
                actionType={updateNameBill}
                item={item}
                openModal={confirmChanges.openModal}
              >
                Ingresa el nombre de la cuenta:
              </ActionsKeyboard>
            </>
          ) : selectedOption === NOTES_NAME ? (
            <>
              <ActionsKeyboard
                option={selectedOption}
                actionType={updateNameNote}
                item={item}
                openModal={confirmChanges.openModal}
              >
                Ingresa el nombre de la nota:
              </ActionsKeyboard>
            </>
          ) : selectedOption === COMMENTS ? (
            <>
              <ActionsKeyboard
                option={selectedOption}
                actionType={updateCommentBill}
                item={item}
                openModal={confirmChanges.openModal}
              >
                Agregar comentarios a la cuenta
              </ActionsKeyboard>
            </>
          ) : selectedOption === SEPARATE_CHECKS ? (
            <>
              <SeparateChecks
                item={item}
                openModal={confirmChanges.openModal}
              ></SeparateChecks>
            </>
          ) : selectedOption === MOVE_PRODUCTS ? (
            <>
              <TransferProducts
                item={item}
                openModal={confirmChanges.openModal}
              >
                ESTE ES EL CHILDREN
              </TransferProducts>
            </>
          ) : selectedOption === MOVE_TABLE ? (
            <>
              <MoveTable item={item} openModal={confirmChanges.openModal}>
                YEP
              </MoveTable>
            </>
          ) : selectedOption === PRODUCTS_DISCOUNTS ? (
            <>
              <ProductsDiscounts
                item={item}
                openModal={confirmChanges.openModal}
              >
                YEP
              </ProductsDiscounts>
            </>
          ) : selectedOption === NOTES_DISCOUNTS ? (
            <>
              <NotesDiscounts item={item} openModal={confirmChanges.openModal}>
                YEP
              </NotesDiscounts>
            </>
          ) : selectedOption === BILL_DISCOUNTS ? (
            <>
              <BillDiscount item={item} openModal={confirmChanges.openModal}>
                YEP
              </BillDiscount>
            </>
          ) : selectedOption === COURTESY_APPLY_PRODUCTS ? (
            <>
              <ProductsCourtesy
                item={item}
                openModal={confirmChanges.openModal}
              >
                YEP
              </ProductsCourtesy>
            </>
          ) : selectedOption === COURTESY_APPLY_NOTES ? (
            <>
              <NotesCourtesy item={item} openModal={confirmChanges.openModal}>
                YEP
              </NotesCourtesy>
            </>
          ) : selectedOption === COURTESY_APPLY_BILL ? (
            <>
              <ActionsKeyboard
                option={selectedOption}
                actionType={createDiscount}
                item={item}
                openModal={confirmChanges.openModal}
              >
                Ingresa descripcion de la cortesia:
              </ActionsKeyboard>
            </>
          ) : selectedOption === PRODUCTS_CANCEL ? (
            <>
              <ProductsCancel item={item} openModal={confirmChanges.openModal}>
                YEP
              </ProductsCancel>
            </>
          ) : selectedOption === NOTES_CANCEL ? (
            <>
              <NotesCancellation
                item={item}
                openModal={confirmChanges.openModal}
              >
                YEP
              </NotesCancellation>
            </>
          ) : selectedOption === BILL_CANCEL ? (
            <>
              <ActionsKeyboard
                option={selectedOption}
                actionType={cancelBill}
                item={item}
                openModal={confirmChanges.openModal}
              >
                Ingresa descripcion de la cancelacion:
              </ActionsKeyboard>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "1312px",
                fontSize: "32px",
              }}
            >
              {selectedOption === "" ? (
                <img
                  src={tomateIcon}
                  alt="tomate-icon"
                  style={{ height: "100px", margin: "25px" }}
                />
              ) : (
                <>
                  <strong>{selectedOption}: En construccion...</strong>
                  <img
                    src={tomateIcon}
                    alt="tomate-icon"
                    style={{ height: "100px", margin: "25px" }}
                  />
                </>
              )}
            </div>
          )}
        </section>
      )}
    </main>
  );
}
