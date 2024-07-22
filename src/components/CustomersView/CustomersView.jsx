import { useEffect, useState, useMemo } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link, Outlet } from "react-router-dom";
import { API } from "../../API/serverRequest";
import { customerKeywords } from "../KeyWords/Keywords";
import StatusButton from "../StatusButton/StatusButton";
import useToast from "../../hooks/useToast";
function CustomersView() {
  const [customers, setCustomers] = useState([]);
  const [interactedCustomer, setInteractedCustomer] = useState("");
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
  const handleDelete = async (id) => {
    try {
      const resp = await API.deleteCustomer(id);
      if (resp.success) {
        setToast({ variant: "success", message: "Customer deleted" });
        setCustomers((prevCustomers) =>
          prevCustomers.filter((customer) => customer.id !== id)
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
      const resp = await API.changeCustomerStatus(id, status, exId);
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

  const generateActions = (id, status, exId) => {
    return [
      <StatusButton
        key={`delete-${id}`}
        action={() => handleActionButtonClicked(id, 0, () => handleDelete(id))}
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
      actions: generateActions(customer.id, customer.status, customer.exId),
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
    </>
  );
}

export default CustomersView;
