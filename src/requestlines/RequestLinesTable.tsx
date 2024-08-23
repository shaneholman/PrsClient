import React, { SyntheticEvent } from "react";
import { RequestLines } from "./RequestLines";
import { Request } from "../requests/Request";
import { Link } from "react-router-dom";

interface RequestLinesProps {
  request: Request;
  onRemove: (requestLines: RequestLines) => void;
}

function RequestLinesTable({ request, onRemove }: RequestLinesProps) {
  return (
    <table className="table table-hover table-light w-50">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {request.requestLines?.map((requestline) => (
          <tr key={requestline.id}>
            <td>{requestline.product?.name}</td>

            <td>${requestline.product?.price}</td>
            <td>{requestline.quantity}</td>
            <td>${(requestline.product?.price ?? 0) * (requestline.quantity ?? 0)}</td>
            <td>
              <Link to={`/requests/detail/${request.id}/requestlines/edit/${requestline.id}`} className="btn btn-outline-secondary">
                Edit
              </Link>
              <Link to={`requestLines/edit/${requestline.id}`}></Link>

              <a
                className="btn btn-outline-danger"
                onClick={(event: SyntheticEvent) => {
                  event.preventDefault();
                  onRemove(requestline);
                }}
              >
                delete
              </a>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot >
        <tr>
          <td></td>
          <td></td>
          <td>Total </td>
          <td>${request.total}</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
}

export default RequestLinesTable;
