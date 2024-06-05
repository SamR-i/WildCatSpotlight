import { InputAdornment, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { AppContext } from '../../AppContext';
import { categoryList } from '../EventUploadComponent/EventUpload';
import CategoryFilter from './CategoryFiltersComponent/CategoryFilters';
import DateSelector from './DateSelector/DateSelector';
import "./searchBar.css";
const style = {
    position: 'absolute',
    top: '50vh',
    left: '50vw',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 5
};

const WholeSearch = ({ setData, initialData }) => {
    const [query, setQuery] = useState('');
    const [categories, setCategories] = useState([]);
    const [dateFilter, setDateFilter] = useState(''); // New state for date filtering
    const { appTheme } = useContext(AppContext);
    
    const handleSearch = (newQuery) => {
        let filteredData = initialData;
        if (newQuery !== '') {
            filteredData = filteredData.filter(item => 
                item.eventName.toLowerCase().includes(newQuery.toLowerCase()) ||
                item.eventDesc.toLowerCase().includes(newQuery.toLowerCase()) ||
                item.orgName.toLowerCase().includes(newQuery.toLowerCase()) ||
                item.eventLoc.toLowerCase().includes(newQuery.toLowerCase()) // Moved this line inside the filter method
            );
        }
    
        if (categories.length > 0) {
            const lowerCaseCategories = categories.map(item => item[0].toLowerCase());
            filteredData = filteredData.filter(item =>
                item.eventType && lowerCaseCategories.includes(item.eventType.toLowerCase())
            );
        }
        if (dateFilter && dateFilter.date.trim() != '') {
            // Convert the date from the dateFilter to an ISO string, then slice to get only the date part
            const modifiedFilter = new Date(dateFilter.date).toISOString().slice(0, 10);
            console.log("Filtered date:", modifiedFilter);
            
            filteredData = filteredData.filter(item => {
                const eventDate = new Date(item.eventStart).toISOString().slice(0, 10);
                console.log("Matched date:", eventDate);
                return eventDate === modifiedFilter;
            });
        }
        
        setData(filteredData);
    };
    
    const onSelectingFilter = (category) => {
        const index = categories.findIndex(c => c[0] === category[0]);
        if (index > -1) {
            setCategories(categories.filter((_, i) => i !== index));
        } else {
            setCategories([...categories, category]);
        }
    };
    useEffect(() => {
        handleSearch(query);
    }, [query, categories, dateFilter]); // React to changes in dateFilter object

    return (
        <div className="nobkg" style={{ alignItems: 'center', justifyContent: 'space-between', backgroundColor: appTheme.themeColor }}>
            <div className="iconsContainer" style={{ display: 'flex', flexDirection: 'column', textAlign: "left", margin: '8px'}}>
                <div className="othercontainer" style={{"display":"flex", "flexDirection":"row", "justifyContent": "space-between"}}>
                <TextField
                    sx={{ display: 'flex', width: '70%' }}
                    hiddenLabel
                    variant="standard"
                    id="filled-hidden-label-small"
                    placeholder='Search events'
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start" style={{ borderRight: `solid ${appTheme.tint} 2px`, height: '100%', paddingRight: '1%' }}>
                                <FaSearch style={{ marginRight: '2%', color: appTheme.tint }} />
                            </InputAdornment>
                        ),
                        disableUnderline: true,
                        style: { color: 'white' }
                    }}
                />
                <DateSelector setDateFilter={setDateFilter} dateFilter={dateFilter}/>
                </div>
            
               
                <div className='categoryHolder'>
                    {categoryList.map((category, index) => (
                        <CategoryFilter
                            key={index}
                            favicon={category[1]}
                            categoryName={category[0]}
                            isSelected={categories.findIndex(c => c[0] === category[0]) > -1}
                            onSelect={() => onSelectingFilter(category)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WholeSearch;