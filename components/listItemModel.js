import { Button, Card, CardHeader, CardBody, Modal } from "reactstrap";

const listItemModel = ()=>{
    return(
        <Modal isOpen={modalFormOpen} toggle={() => setModalFormOpen(false)}>
            <div className=" modal-body p-0">
        <Card className="shadow border-0">
          <CardHeader className=" bg-white">
            <div className=" text-muted text-center">
              <h3 className="mb-0 py-2">List Item to Market</h3>
            </div>
          </CardHeader>
          <CardBody className=" px-lg-5 py-lg-5">
            <form id="form-create-item" className="form-border" action="#">
              <div className="field-set">
                <div className="spacer-10"></div>
                <h5>Display Name</h5>
                <input
                  type="text"
                  name="item_title"
                  id="item_title"
                  className="form-control"
                  placeholder="e.g. 'Crypto Funk"
                  onChange={(e) =>
                    updateFormInput({ ...formInput, name: e.target.value })
                  }
                />
                <div className="spacer-10"></div>
                <h5>Symbol</h5>
                <input
                  type="text"
                  name="item_title"
                  id="item_title"
                  className="form-control"
                  placeholder="e.g. 'CF"
                  onChange={(e) =>
                    updateFormInput({ ...formInput, symbol: e.target.value })
                  }
                />
                <div className="spacer-10"></div>
                <h5>Description</h5>
                <textarea
                  data-autoresize
                  name="item_desc"
                  id="item_desc"
                  className="form-control"
                  placeholder="e.g. 'This is very limited item'"
                  onChange={(e) =>
                    updateFormInput({
                      ...formInput,
                      description: e.target.value,
                    })
                  }
                ></textarea>

                <div className="spacer-10"></div>
                <div className="d-flex flex-columb justify-content-center">
                  <button
                    type="button"
                    className="btn-main"
                    onClick={createCollection}
                  >
                    Create Collection
                  </button>
                </div>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
        </Modal>
    )
}

export default listItemModel