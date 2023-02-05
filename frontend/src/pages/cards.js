import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alignment: ""
        };

        this.handleChange = this.handleChange.bind(this)
    }

    async handleChange(event, newAlignment) {
        event.target.value = newAlignment;
    }

    render() {
        const locations = JSON.parse(sessionStorage.getItem("locations"))
        console.log(locations[0][0].thumbnail)
        const itemData = [];
        for (var i = 0; i < locations.length; i++) {
            for (var j = 0; j < locations[0].length; j++) {
                var obj = {
                    img: locations[i][j].thumbnail,
                    title: locations[i][j].title
                }
                itemData.push(obj);
            }
        }

        return (
            <>
                <ImageList sx={{ width:800, height: 1000 }} cols={3} rowHeight={164}>
                    {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                        <h2>{item.title}</h2>
                        <img
                            src={`${item.img}?w=130&h=130&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=130&h=130&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                        />
                        <ToggleButtonGroup size = "small" color="primary" value={this.state.alignment} exclusive onChange={this.handleChange} aria-label="Platform">
                            <ToggleButton value="Yes">Yes</ToggleButton>
                            <ToggleButton value="No">No</ToggleButton>
                        </ToggleButtonGroup>
                    </ImageListItem>
                    ))}
                </ImageList>
            </>
        );
    }

}

export default Cards;