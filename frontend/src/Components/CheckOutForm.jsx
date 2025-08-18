import React from "react";

const CheckOutForm = ({ orderForm, setOrderForm }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <form className="max-w-xl mx-6 p-2 space-y-6">
        <h2 className="font-bold font-sans text-lg pl-4">Billing Details</h2>
        <div className="flex flex-col gap-4 md:flex-row md:gap-2 p-2">
          {/* First Name */}
          <div className="w-full md:w-1/2">
            <label
              htmlFor="firstName"
              className="font-semibold font-sans text-lg p-2"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="Enter First Name"
              className="w-full rounded-full px-4 py-2 text-base bg-gray-50 border border-green-500 focus:outline-none focus:ring-1 focus:ring-green-700"
              name="Firstname"
              value={orderForm.Firstname}
              onChange={handleChange}
              required
            />
          </div>

          {/* Last Name */}
          <div className="w-full md:w-1/2">
            <label
              htmlFor="lastName"
              className="font-semibold font-sans text-lg p-2"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Enter Last Name"
              className="w-full rounded-full px-4 py-2 text-base bg-gray-50 border border-green-500 focus:outline-none focus:ring-1 focus:ring-green-700"
              name="Lastname"
              value={orderForm.Lastname}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="">
            <h2 className="font-semibold font-sans text-lg p-2">
              Company Name(optional)
            </h2>
          </label>
          <input
            type="text"
            placeholder="Company Name"
            className="w-full rounded-full px-4 py-2 text-base bg-gray-50 border border-green-500 focus:outline-none focus:ring-1 focus:ring-green-700"
            name="companyName"
            value={orderForm.companyName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="">
            <h2 className="font-semibold font-sans text-lg p-2">Country</h2>
          </label>
          <input
            type="text"
            placeholder="Country"
            className="w-full rounded-full px-4 py-2 text-base bg-gray-50 border border-green-500 focus:outline-none focus:ring-1 focus:ring-green-700"
            name="country"
            value={orderForm.country}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">
            <h2 className="font-semibold font-sans text-lg p-2">
              Street Address
            </h2>
          </label>
          <input
            type="text"
            placeholder="Street Address"
            className="w-full rounded-full px-4 py-2 text-base bg-gray-50 border border-green-500 focus:outline-none focus:ring-1 focus:ring-green-700"
            name="streetAddress"
            value={orderForm.streetAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="">
            <h2 className="font-semibold font-sans text-lg p-2">City</h2>
          </label>
          <input
            type="text"
            placeholder="City"
            className="w-full rounded-full px-4 py-2 text-base bg-gray-50 border border-green-500 focus:outline-none focus:ring-1 focus:ring-green-700"
            name="city"
            value={orderForm.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="">
            <h2 className="font-semibold font-sans text-lg p-2">state</h2>
          </label>
          <input
            type="text"
            placeholder="State"
            className="w-full rounded-full px-4 py-2 text-base bg-gray-50 border border-green-500 focus:outline-none focus:ring-1 focus:ring-green-700"
            name="state"
            value={orderForm.state}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="">
            <h2 className="font-semibold font-sans text-lg p-2">Zip Code</h2>
          </label>
          <input
            type="text"
            placeholder="Zip Code"
            className="w-full rounded-full px-4 py-2 text-base bg-gray-50 border border-green-500 focus:outline-none focus:ring-1 focus:ring-green-700"
            name="zipcode"
            value={orderForm.zipcode}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="">
            <h2 className="font-semibold font-sans text-lg p-2">Phone</h2>
          </label>
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full rounded-full px-4 py-2 text-base bg-gray-50 border border-green-500 focus:outline-none focus:ring-1 focus:ring-green-700"
            name="cellNumber"
            value={orderForm.cellNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="">
            <h2 className="font-semibold font-sans text-lg p-2">Email</h2>
          </label>
          <input
            type="text"
            placeholder="Email"
            className="w-full rounded-full px-4 py-2 text-base bg-gray-50 border border-green-500 focus:outline-none focus:ring-1 focus:ring-green-700"
            name="email"
            value={orderForm.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="p-2">
          <label>
            <h2 className="font-semibold font-sans text-lg p-2">
              {" "}
              Delivery Address <span className="text-red-500">*</span>
            </h2>
          </label>

          <div className="flex flex-col gap-3 space-x-4 md:flex-row">
            <label
              className={`flex items-center w-full rounded-full border px-4 py-2 cursor-pointer ${
                orderForm.deliveryAddress === "false"
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              <input
                type="radio"
                name="deliveryAddress"
                value="false"
                checked={orderForm.deliveryAddress === "false"}
                onChange={handleChange}
                className="hidden"
                required
              />
              <span
                className={`w-4 h-4 rounded-full border-2 mr-2 mt-0.5 flex items-center justify-center ${
                  orderForm.deliveryAddress === "false"
                    ? "border-green-600"
                    : "border-gray-400"
                }`}
              >
                {orderForm.deliveryAddress === "false" && (
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                )}
              </span>
              Same as shipping address
            </label>

            <label
              className={`flex items-center w-full rounded-full border px-4 py-2 cursor-pointer ${
                orderForm.deliveryAddress === "true"
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              <input
                type="radio"
                name="deliveryAddress"
                value="true"
                checked={orderForm.deliveryAddress === "true"}
                onChange={handleChange}
                required
                className="hidden"
              />
              <span
                className={`w-4 h-4 rounded-full border-2 mr-2 mt-0.5 flex items-center justify-center ${
                  orderForm.deliveryAddress === "true"
                    ? "border-green-600"
                    : "border-gray-400"
                }`}
              >
                {orderForm.deliveryAddress === "true" && (
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                )}
              </span>
              Use a different billing address
            </label>
          </div>
        </div>
      </form>
    </>
  );
};

export default CheckOutForm;
