/* eslint-disable react/prop-types */
import { Button } from './button'

export const Pagination = ({currentPage, totalPages, setCurrentPage}) => {

    const onNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const onPrevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    const onSpecificPage = (page) => {
        setCurrentPage(page);
    }

    const getVisiblePages = () => {
        const totalNumbers = 5;
        const half = Math.floor(totalNumbers / 2);

        let start = Math.max(currentPage - half, 1);
        let end = Math.min(currentPage + half, totalPages.length);

        if (currentPage <= half) {
            end = Math.min(totalNumbers, totalPages.length);
        } else if (currentPage + half >= totalPages.length) {
            start = Math.max(totalPages.length - totalNumbers + 1, 1);
        }

        return Array.from({ length: end - start + 1 }, (_, idx) => start + idx);
    }

    const visiblePages = getVisiblePages();

    return(
        <div className='flex justify-between'>
            <Button variant="secondary" disabled={currentPage === 1} onClick={onPrevPage}>Anterior</Button>
            <div>
                {visiblePages.map((page) => (
                    <Button
                        key={page}
                        variant={`${currentPage === page ? 'default' : 'secondary'}`}
                        className='mx-1'
                        onClick={() => onSpecificPage(page)}
                    >
                        {page}
                    </Button>
                ))}
            </div>
            <Button variant="secondary" disabled={currentPage === totalPages.length} onClick={onNextPage}>Siguiente</Button>
        </div>
    )
}
