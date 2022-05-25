import React from 'react'
import { Nav, Pagination } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const Paginate = ({pages, page, keyword='', isAdmin=false }) => {

    if (keyword) {
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }

    return (
    
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((x) => (
                    <Nav.Link as={NavLink} 
                        key={x + 1}
                        to={!isAdmin ?
                            `/?keyword=${keyword}&page=${x + 1}`
                            : `/admin/productlist/?keyword=${keyword}&page=${x + 1}`
                        }
                    >
                        <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                    </Nav.Link>
                ))}
            </Pagination>
        
    )
    )
}

export default Paginate