import React from "react";
/* 
  title
  author
  publisher
  imageLinks
  description

*/

//startIndex, maxResult, totalItems

//currentPage, itemsPerPage, totalPage
//itemsPerPage = maxResult
//totalPage = Math.ceil(totalItems / maxResult) , 15, 10, 2
//currentPage = startIndex / maxResult

/* 
     server-side pagination: less payload, less stress on server
        infinite scroll
     client-side pagination: , slice

    auto complete

     debouncing

     throttling


unit test: one functionality, one component, no network, mock up api, data
  prevent breaking existing code
  help other dev to read your code
integration test: multiple component work together,

e2e test: end to end test, browser, 

*/
const Booklist = ({ list = [], onClickBook, onClickPrev, onClickNext, currentPage, totalPages }) => {
    return (
        <div className="booklist">
            <ul>
                {list.length === 0 ? <span>Nothing here</span> : list.map((item) => {
                    const {
                        title,
                        author,
                        publisher,
                        description,
                        imageLinks: { thumbnail } = {},
                    } = item.volumeInfo;
                    return (
                        <li key={item.id} className="list-item" onClick={e => onClickBook(item)}>
                            <div>
                                <img alt={title ?? "thumbnail"} src={thumbnail ?? ""} />
                            </div>
                            <div>
                                <div><strong>title: </strong><span>{title ?? "N/A"}</span></div>
                                <div><strong>author: </strong><span>{author ?? "N/A"}</span></div>
                                <div><strong>publisher: </strong><span>{publisher ?? "N/A"}</span></div>
                                <div><strong>description: </strong><span>{description ?? "N/A"}</span></div>
                            </div>
                        </li>
                    );
                })}
            </ul>
            <div className="pagination-container"><button onClick={onClickPrev}>prev</button><span data-testid="pagination">{currentPage}/{totalPages}</span><button onClick={onClickNext}>next</button></div>
        </div>
    );
};

export default Booklist;
