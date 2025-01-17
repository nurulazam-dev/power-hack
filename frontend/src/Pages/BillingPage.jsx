import { useState, useEffect, useContext } from "react";
import AddBillModal from "../components/Billings/AddBillModal";
import { GrFormView } from "react-icons/gr";
import ViewBillModal from "../components/Billings/ViewBillModal";
import { BASE_URL } from "../../config";
import { authContext } from "../context/AuthContext";

const BillingPage = () => {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [filteredBills, setFilteredBills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [billsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(authContext);

  useEffect(() => {
    if (user?._id) {
      fetchBills();
    }
  }, [user?._id]);

  const fetchBills = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/bills`);
      if (!response.ok) {
        throw new Error(`Failed to fetch bills: ${response.status}`);
      }
      const data = await response.json();
      setBills(data);
      setFilteredBills(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term.trim() === "") {
      setFilteredBills(bills);
    } else {
      const filtered = bills.filter(
        (bill) =>
          bill.billingHolder.toLowerCase().includes(term) ||
          bill.phone.includes(term) ||
          bill.id.toString().includes(term)
      );
      setFilteredBills(filtered);
    }
  };

  const handleAddBill = (newBill) => {
    setBills((prev) => [newBill, ...prev]);
    setFilteredBills((prev) => [newBill, ...prev]);
  };

  // Pagination logic
  const indexOfLastBill = currentPage * billsPerPage;
  const indexOfFirstBill = indexOfLastBill - billsPerPage;
  const currentBills = filteredBills.slice(indexOfFirstBill, indexOfLastBill);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="pt-6 my-10 bg-white overflow-x-auto">
      <div className="border bg-violet-600 my-4 rounded flex justify-between w-10/12 mx-auto px-7 py-2">
        <div className="flex items-center">
          <h2 className="font-semibold text-2xl text-white">Billings</h2>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className="input bg-white input-bordered text-black mx-3 w-full max-w-xs"
          />
        </div>
        <div>
          <AddBillModal onAddBill={handleAddBill} loggedInUserId={user?._id} />
          <label
            htmlFor="bill-add-modal"
            className="btn text-[15px] text-white border-none hover:bg-green-700"
          >
            Add New Bill
          </label>
        </div>
      </div>

      {loading ? (
        <div className="text-center my-4">Loading bills...</div>
      ) : error ? (
        <div className="text-center my-4 text-red-600">{error}</div>
      ) : filteredBills.length === 0 ? (
        <div className="text-center my-4">No bills found.</div>
      ) : (
        <>
          <table className="table table-compact text-center text-black w-10/12 mx-auto">
            <thead>
              <tr className="text-black font-bold text-[16px]">
                <th className="border">Billing ID</th>
                <th className="border">Billing Holder Name</th>
                <th className="border">Phone</th>
                <th className="border">Paid Amount</th>
                <th className="border">Paid Date</th>
                <th className="border">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentBills.map((bill) => (
                <tr key={bill?._id} className="border text-left">
                  <td className="border">{bill?._id}</td>
                  <td className="border">{bill?.billingHolder}</td>
                  <td className="border">{bill?.phone}</td>
                  <td className="border">$ {bill?.amount}</td>
                  <td className="border">{bill?.date}</td>
                  <td className="flex justify-center items-center px-0">
                    <ViewBillModal bill={selectedBill} />
                    <label
                      htmlFor="bill-view-modal"
                      onClick={() => setSelectedBill(bill)}
                      className="btn btn-outline btn-success btn-sm px-1"
                    >
                      <GrFormView className="w-7 h-7" />
                      View
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination flex justify-center my-4">
            {[
              ...Array(Math.ceil(filteredBills.length / billsPerPage)).keys(),
            ].map((page) => (
              <button
                key={page}
                onClick={() => paginate(page + 1)}
                className={`px-3 py-1 mx-1 border rounded ${
                  currentPage === page + 1
                    ? "bg-violet-600 text-white"
                    : "bg-white"
                }`}
              >
                {page + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default BillingPage;
