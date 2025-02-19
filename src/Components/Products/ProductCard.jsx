import Remove from "../../icons/Remove";
import Edit from "../../icons/Edit";


const PracticeCard = ({ product }) => {



  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
        </div>
      </td>
      <th scope="row" className="pl-1 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {product?.name}
      </th>
      <td className="px-4 py-4">
        {product?.category}
      </td>
      <td className="px-4 py-4">
        {product?.price}
      </td>
      <td className="px-4 py-4">
        {product?.standard_price}
      </td>
      <td className="px-4 py-4">
        {product?.qty}
      </td>
      <td className="px-4 py-4">
        {"True"}
      </td>
      <td className="px-4 py-4" dangerouslySetInnerHTML={{ __html: product?.description }} />
      <td className="pl-4 py-4 pr-5 flex justify-end gap-2 items-center">
        <Edit size='25px' />
        <Remove size='25px' />
      </td>
    </tr>
  );
};

export default PracticeCard;
