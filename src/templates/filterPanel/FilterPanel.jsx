import './styles/filterPanel.scss';
import { useSelector, useDispatch } from "react-redux";
import { searchProduct, setKeyword } from "../../redux/features/products";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Grid from '@mui/material/Grid';
import TextBox from '../../components/atoms/textBox/TextBox';

function FilterPanel() {
    const dispatch = useDispatch();
    
    // get data from redux store
    const searchKeyword = useSelector((state) => state.products.searchKeyword);

    const onSetKeyword = (keyword) => {
        // send action call for search products by keyword
        dispatch(setKeyword(keyword));
    }

    const onSubmit = () => {
        // submit the search action
        if (searchKeyword !== "") {
            dispatch(searchProduct(searchKeyword));
        }
    }

    return (
        <div className='filter-panel'>
            <Grid container rowGap={1} className='filter-container'>
                <Grid item xs={12} md={12}>
                    <Grid container>
                        <Grid item xs={12} md={5} lg={5}>
                            {/* Search TextBox */}
                            <TextBox id="search" value={searchKeyword} size="small" placeholder="Search by name, price or category"
                                onChange={(e) => onSetKeyword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={2} lg={2}>
                            {/* Search Button */}
                            <Button className='search-btn' onClick={onSubmit}>
                                <SearchIcon />
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div >
    )
}

export default FilterPanel;