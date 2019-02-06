import React from 'react'
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const RenderList = ({ todoList, RemoveTodo, DoneTodo, Filter, Quote}) => {
    var validity = null;
    const FilterHandler = ({todo}) =>{
        if (Filter === "Edit") {
           return <IconButton aria-label="Delete" color="secondary" onClick={() => { RemoveTodo(todo) }}><Icon>clear</Icon></IconButton> 
        } else if (["Done", "Failed", "MonthlyF", "WeeklyF", "DailyF", "AllF","Done", "MonthlyD", "WeeklyD", "DailyD", "AllD"].includes(Filter) !== true) {
            return(
                <div><IconButton aria-label="Done" color="primary" onClick={() => { DoneTodo(todo); }}><Icon>done</Icon></IconButton>
                <IconButton aria-label="Delete" color="secondary" onClick={() => { RemoveTodo(todo) }}><Icon>clear</Icon></IconButton></div>
            ) 
        }else if (["Done","MonthlyD","WeeklyD","DailyD","AllD"].includes(Filter)) {
            return <IconButton aria-label="Done" color="primary"><Icon>check_circle</Icon></IconButton>
        } else if (["Failed","MonthlyF","WeeklyF","DailyF","AllF"].includes(Filter)) {
            return <IconButton aria-label="Done" color="default"><Icon>reply</Icon></IconButton>
        }
        return null  
    }

    try {
        console.log(todoList.key)
        validity = todoList.key;
        
    } catch (error) {
        validity = false;
    } 

    const list = validity && todoList.key.length ? todoList.key.map(
          todo => {
            return (
              <ListItem key={todo}>
                <ListItemText
                  primary={todoList.value[todoList.key.indexOf(todo)]}
                  secondary={todoList.timedate[todoList.key.indexOf(todo)]}
                />
                <FilterHandler todo={todo} />
              </ListItem>
            );
          }
        ) : 
        <div>
          <Card>
            <CardContent className="quotes">
                    <Typography variant="h6" component="h2">“{Quote.quote}”</Typography>
                <Typography color="textSecondary">—{Quote.author} </Typography>
            </CardContent>
          </Card>
        </div>;

    return <div className={DoneTodo === "" ? "editList" :"todoList"}>{list}</div>;
}

export default RenderList 
