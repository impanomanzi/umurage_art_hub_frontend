import { useEffect, useState, useMemo } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link, Outlet } from "react-router-dom";
import { API } from "../../API/serverRequest";
import { customerKeywords } from "../KeyWords/Keywords";
import StatusButton from "../StatusButton/StatusButton";
import useToast from "../../hooks/useToast";
import DeleteConfirmDialog from "../Dialogs/DeleteConfirmDialog/DeleteConfirmDialog";
import StatusView from "../StatusView/StatusView";
function CustomersView() {
  const [customers, setCustomers] = useState([]);
  const [interactedCustomer, setInteractedCustomer] = useState("");
  const [currentCustomerId, setCurrentCustomerId]= useState(null);
  const[showDeleteConfirm, setShowDeleteConfirm]= useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const { setToast } = useToast();
  const getCustomers = async () => {
    try {
      const resp = await API.getCustomers();
      setCustomers(resp.data);
    } catch (error) {
      setToast({ variant: "danger", message: error.message });
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async () => {
    try {
      const resp = await API.deleteCustomer(currentCustomerId);
      if (resp.success) {
        setToast({ variant: "success", message: "Customer deleted" });
        setCustomers((prevCustomers) =>
          prevCustomers.filter((customer) => customer.id !== currentCustomerId)
        );
      } else {
        setToast({ variant: "danger", message: resp.message });
      }
    } catch (error) {
      setToast({ variant: "danger", message: error.message });
    }
  };
  const handleChangeCutomerStatus = async (id, status, exId) => {
    try {
      const resp = await API.changeCustomerStatusAdmin(id, status, exId);
      if (resp.success) {
        setToast({ variant: "success", message: "Customer status changed" });
        setCustomers((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer.id === id
              ? { ...customer, status: resp.data.status }
              : customer
          )
        );
      } else {
        setToast({ variant: "danger", message: resp.message });
      }
    } catch (error) {
      setToast({
        variant: "danger",
        message: error.message,
      });
    }
  };

  const handleActionButtonClicked = async (id, index, callBack) => {
    setInteractedCustomer(String(id) + index);
    await callBack();
    setInteractedCustomer("");
  };
  const innerCopy = (text) => {
    navigator.clipboard.writeText(text);
    setToast({ variant: "success", message: "Text copied" });
  };
  const generateActions = (id, status, exId) => {
    return [
      <StatusButton
        key={`delete-${id}`}
        action={() => handleActionButtonClicked(id, 0, () => {
          setCurrentCustomerId(id)
          setShowDeleteConfirm(true);
        })}
        isLoading={interactedCustomer === String(id) + 0}
        text={"Delete"}
        variant={"danger"}
      />,
      <StatusButton
        key={`status-${id}`}
        action={() =>
          handleActionButtonClicked(id, 1, () =>
            handleChangeCutomerStatus(id, status, exId)
          )
        }
        isLoading={interactedCustomer === String(id) + 1}
        text={"Change Status"}
        variant={"outline-secondary"}
      />,
    ];
  };

  const preprocessedData = useMemo(() => {
    return customers.map((customer) => ({
      ...customer,
      id: <span>
           {customer.id}
            <button
              className="btn btn-outline-primary"
              onClick={() => innerCopy(customer.id)}
            >
              <i className="fas fa-copy"></i>
            </button>
        </span>,
      actions: generateActions(customer.id, customer.status, customer.exId),
      status:<StatusView status={customer.status} isLoading={false}/>
    }));
  }, [customers, interactedCustomer]);
  const listItems = {
    items: preprocessedData,
    keyword: customerKeywords,
    isLoading: isLoading,
    confirmationRequired: true,
  };
  useEffect(() => {
    getCustomers();
  }, []);
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "all" }}>
          All
        </Breadcrumb.Item>
      </Breadcrumb>
      <Outlet context={[listItems]} />
      {showDeleteConfirm&&<DeleteConfirmDialog showModal={showDeleteConfirm} onClick={handleDelete} onClose={()=>setShowDeleteConfirm(!showDeleteConfirm)} itemName={"Customer"}/>}
    </>
  );
}

export default CustomersView;
