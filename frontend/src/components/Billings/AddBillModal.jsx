/* eslint-disable react/prop-types */
import { useState } from "react";
import { BASE_URL } from "../../../config";
import { toast } from "react-toastify";

const AddBillModal = ({ loggedInUserId, onAddBill }) => {
  const [data, setData] = useState({
    billingHolder: "",
    phone: "",
    amount: "",
    status: "Unpaid",
    dateline: "",
    billAttacher: loggedInUserId || null,
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleBillAdd = async (event) => {
    event.preventDefault();
    const url = `${BASE_URL}/bills`;
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized: Please log in again.");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await response.json();
      toast.success(res.message);

      const newBill = await response.json();
      toast.success(newBill.message);
      onAddBill(newBill);
      setData({
        billingHolder: "",
        phone: "",
        amount: "",
        status: "Unpaid",
        dateline: "",
        billAttacher: loggedInUserId || null,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <input type="checkbox" id="bill-add-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative w-full max-w-xs bg-white">
          <label
            htmlFor="bill-add-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-xl text-center text-black font-bold">
            Add New Bill
          </h3>
          <form onSubmit={handleBillAdd}>
            <input
              name="billingHolder"
              type="text"
              placeholder="Billing Holder Name"
              onChange={handleChange}
              value={data.billingHolder}
              className="input focus:outline-none border text-black border-black w-full max-w-xs mt-4 bg-white"
              required
            />
            <input
              name="phone"
              type="number"
              placeholder="Phone Number"
              onChange={handleChange}
              value={data.phone}
              className="input focus:outline-none border border-black w-full max-w-xs mt-4 bg-white text-black"
              required
            />
            <input
              name="amount"
              type="number"
              onChange={handleChange}
              value={data.amount}
              placeholder="Paid Amount"
              className="input focus:outline-none border border-black w-full max-w-xs mt-4 bg-white text-black"
              required
            />
            <input
              name="dateline"
              type="date"
              onChange={handleChange}
              value={data.dateline}
              placeholder="Bill dateline"
              className="input focus:outline-none border border-black w-full max-w-xs mt-4 bg-white text-black"
              required
            />
            <input
              type="submit"
              value="Bill Add"
              className="btn w-full border-none text-[15px] text-white hover:text-black max-w-xs mt-3 bg-violet-600 hover:bg-orange-600"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBillModal;
