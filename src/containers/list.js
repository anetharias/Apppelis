import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";

const API = process.env.API;

const List = () => {
  const [state, setState] = useState({
    data: [],
    totalResults: 0,
    loading: true,
    searchTerm: "",
    error: "",
    currentPage: 1,
  });

  const getMovie = async (page) => {
    const res = await fetch(`${API}&s=batman&page=${page}`);
    const resJSON = await res.json();

    if (resJSON) {
      setState((prevState) => ({
        ...prevState,
        data: resJSON.Search,
        totalResults: parseInt(resJSON.totalResults),
        loading: false,
        error: "",
      }));
    }
  };

  useEffect(() => {
    getMovie(state.currentPage);
  }, [state.currentPage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (state.searchTerm === "") {
      return setState({ ...state, error: "Escribe un texto válido" });
    }

    const response = await fetch(`${API}&s=${state.searchTerm}`);
    const data = await response.json();

    if (!data.Search) {
      return setState({ ...state, error: "No hay resultados" });
    }

    return setState({
      data: data.Search,
      totalResults: parseInt(data.totalResults),
      searchTerm: "",
      error: "",
      currentPage: 1, // Reset current page when performing a new search
    });
  };

  const handlePageChange = (newPage) => {
    setState({
      ...state,
      currentPage: newPage,
    });
  };

  const { data, totalResults, loading, currentPage } = state;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="row">
        <div className="col-md-4 offset-md-4 p-4">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              onChange={(e) =>
                setState({ ...state, searchTerm: e.target.value })
              }
              value={state.searchTerm}
              autoFocus
            />
          </form>
          <p className="text-white">{state.error ? state.error : ""}</p>
        </div>
      </div>
      <div className="row pt-2">
        {data.map((movie, i) => (
          <Card movie={movie} key={i} />
        ))}
      </div>
      <div className="row">
        <div className="col-md-4 offset-md-4 mt-3">
          <p className="text-white">
            Showing {data.length} of {totalResults} results
          </p>
          <nav aria-label="Page navigation">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </button>
              </li>
              <li className="page-item">
                <span className="page-link">{currentPage}</span>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default List;
