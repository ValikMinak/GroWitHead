import React, {useEffect, useRef} from 'react';
import TodoColumn from "./TodoColumn";
import {DragDropContext} from "react-beautiful-dnd";

let listId = 1000;
const TodoBoard = ({
                       board, boardList, inputValue, setInputValue, setNewBoard,
                       addList, setAddList, isActiveBoard, isChangeBoardName,activeBoardName,changeBoardName,setActiveBoardId
                   }) => {
    const newColumnNameRef = useRef();
    useEffect(() => {
        isActiveBoard(board.name);
        setActiveBoardId(board.id)
    }, []);
    useEffect(() => {
        newColumnNameRef.current && newColumnNameRef.current.focus();
        newColumnNameRef.current && newColumnNameRef.current.select()
    }, [addList]);
    const addAnotherColumn = (e) => {
        if ((inputValue.length > 0 && inputValue !== " " && e.key === "Enter") || (inputValue.length > 0 && inputValue !== " " && e.type === "click")) {
            setNewBoard(boardList.map((item) => item.id === board.id
                ? {
                    ...item,
                    columns: [...item.columns, {name: inputValue, id: listId++, cards: []}]
                }
                : item
            ));
            setInputValue("");
        }

    };
    const deleteColumn = (columnId) => {
        setNewBoard(
            boardList.map((boardListItem) => boardListItem.id === board.id
                ? {
                    ...boardListItem,
                    columns: boardListItem.columns.filter((columnsItem) => columnsItem.id !== columnId)
                }
                : boardListItem
            ))
    };
    const handleDragEnd = ({destination, source}) => {
        if (!destination) {
            return;
        }
        if (destination.index === source.index && destination.droppableId === source.droppableId) {
            return;
        }
        const itemCopy = board.columns.find((column) => column.name + column.id === source.droppableId).cards[source.index];
        setNewBoard(prev => {
            prev.map((b) => b.id === board.id
                ? {
                    ...b,
                    columns: b.columns.find((column) => column.name + column.id === source.droppableId).cards.splice(source.index, 1)
                }
                : b
            );
            prev.map((b) => b.id === board.id
                ? {
                    ...b,
                    columns: b.columns.find((column) => column.name + column.id === destination.droppableId).cards.splice(destination.index, 0, itemCopy)
                }
                : b
            );
            return prev
        });
    };

    const changeName = (e) => {
        if (e.target.className === "todoContent" && boardList.length > 0 && isChangeBoardName && activeBoardName.length > 0) {
            changeBoardName()
        }
    };
    return (
        <div onClick={changeName} className="todoContent">
            <DragDropContext onDragEnd={handleDragEnd}>
                {board.columns && board.columns.map((column) => {
                        return (
                            <TodoColumn key={column.id} board={board}
                                        boardList={boardList}
                                        column={column} setNewBoard={setNewBoard}
                                        deleteColumn={deleteColumn}/>
                        )
                    }
                )}
            </DragDropContext>
            {!addList && board.columns.length === 0 &&
            <div onClick={() => setAddList(true)} className="todoContent__add">
                Add new list
            </div>}
            {!addList && board.columns.length > 0 &&
            <div onClick={() => setAddList(true)} className="todoContent__add">
                Add another one column
            </div>}
            {addList && <div className="todoContent__input">
                <input placeholder="Enter a list title"
                       maxLength={15}
                       ref={newColumnNameRef}
                       onKeyDown={(e) => addAnotherColumn(e)}
                       value={inputValue}
                       onChange={(e) => setInputValue(e.target.value.replace(/\s+/g, ' '))} type="text"/>
                <div>
                    <button onClick={(e) => addAnotherColumn(e)}>Add list</button>
                </div>
            </div>}
        </div>
    );
};

export default TodoBoard;