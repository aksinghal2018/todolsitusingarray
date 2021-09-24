import React, { Component } from 'react'
export class Todo extends Component {
    constructor(props){
        super(props);
        this.state={
            sno:0,
            topic:"",
            description:"",
            task:[
                
            ],
            temp:0
        };
    }
    adddtask=(event)=>{
        let {name,value}=event.target;
        
        this.setState({[name]:value,id:value});
        //alert()
    }
    deletetasklist=(event)=>{
        var id=event.target.id;
        //alert(id)
        this.state.task.splice(id, 1);
        this.updateserial();
    }
    addStr(str, index, stringToAdd){
        return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
    }
    add=(tasks)=>{
        //alert(tasks)
        //var str="<p>a</p><br/><p>a</p><br/><p>a</p><br/><p>a</p><br/><p>a</p><br/><p>a</p><br/><p>a</p><br/>"
        var a=document.getElementById("todolistbody");
        var elem=document.createElement('tr');
        elem.className="listclass";
        var elemsno=document.createElement('th');
        var elem1=document.createElement('th');
        var elem2=document.createElement('th');
        elem2.innerHTML=tasks.description;
        elem2.classList.add("text-left")
        var elem3=document.createElement('th');
        var elem4=document.createElement('button');
        var elem5=document.createElement('button');
        elemsno.appendChild(document.createTextNode(parseInt(this.state.sno)+1));
        elem1.appendChild(document.createTextNode(tasks.topic));
       // elem2.appendChild(document.createTextNode(tasks.description));
        elem4.appendChild(document.createTextNode('Delete'));
        elem4.classList.add("btn", "btn-danger","ml-4","mr-4");
        elem5.classList.add("btn", "btn-warning");
        elem4.setAttribute('id',this.state.sno);
        // alert(elem4.getAttribute('id'))
        elem4.addEventListener("click", this.deletetasklist);
        elem5.appendChild(document.createTextNode('Update'));
        elem5.addEventListener("click", this.updatechild);
        elem5.setAttribute('id',this.state.sno);
        elem3.appendChild(elem4)
        elem3.appendChild(elem5)
        elem.appendChild(elemsno)
        elem.appendChild(elem1)
        elem.appendChild(elem2)
        elem.appendChild(elem3)
        // elem.setAttribute('id',this.state.id);
        a.appendChild(elem);
        this.state.sno++;
        // this.updateserial();
        
    }
    addtasklist=()=>{
        if(this.state.topic==""){
            alert("topic should not be empty");
        }
        else{
            
            var tempstr=""+this.state.description;
            var temp=0
            if(tempstr.length>11){
                for(var i=11;i<tempstr.length;i=i+11+3){
                 tempstr=this.addStr(tempstr,i,"<br/>");
                 temp=temp+5;
            }
            }
            var a=document.getElementById("todolistbody");
            a.innerHTML="";
            this.state.sno=0;
            this.state.task.push({"id":this.state.task.length,"topic":this.state.topic,"description":tempstr})
            //console.log(this.state.task)
            this.state.task.map((tasks)=>{return(this.add(tasks))});}
            this.refreshbtn();
        }
    updateserial=()=>{
        
        var a=document.getElementById("todolistbody");
        a.innerHTML="";
        this.state.sno=0;
        this.state.task.map((tasks)=>{return(this.add(tasks))});
    }
    
    
    updatechild=(event)=>{
        var id=parseInt(event.target.id);
        var elem1=document.getElementById('title');
        var elem2=document.getElementById('description');
        var elemupdate=document.getElementById('btnupdate')
        // console.log(id)
        // console.log(this.state.task)
        this.state.task.map((taskdata)=>{
            if(taskdata.id==id){
                
                elem1.value=taskdata.topic;
                elem2.value=taskdata.description;
            }
        })
        
        elemupdate.removeEventListener("click",this.addtasklist);
        elemupdate.addEventListener("click",this.updatetasklist);
        elemupdate.innerHTML="";
        elemupdate.appendChild(document.createTextNode("update"))
        this.setState({"temp":id})
    }
    updatetasklist=()=>{
        var elem1=document.getElementById('title');
        var elem2=document.getElementById('description');
        var temparray=this.state.task;
        temparray[this.state.temp].topic=elem1.value;
        temparray[this.state.temp].description=elem2.value;
        //console.log(temparray[0])
        var a=document.getElementById("todolistbody");
        a.innerHTML="";
        this.state.sno=0;
        this.state.task.map((tasks)=>{return(this.add(tasks))});
        var elemupdate1=document.getElementById('btnupdate')
        elemupdate1.remove();
        var newbtn=document.createElement("button");
        var parentbutton=document.getElementById("description")
        newbtn.appendChild(document.createTextNode("add"));
        newbtn.addEventListener("click",this.addtasklist);
        parentbutton.parentNode.insertBefore(newbtn,parentbutton.nextSibling);
        newbtn.setAttribute("id","btnupdate");
        newbtn.classList.add("btn","btn-primary","m-4")
        this.refreshbtn();
    }
    refreshbtn=()=>{
        var elem1=document.getElementById('title');
        var elem2=document.getElementById('description');
        elem1.value="";
        elem2.value="";
    }
    render() {
        //Sno=0
        return (
            <div className="" >
                <h1>Todo List</h1>
                <h4>Add List</h4>
                <div className=" d-flex justify-content-center" >
                <input className="m-4" type="text" onChange={this.adddtask} placeholder="add Title" id="title" name="topic"/><textarea className="m-4" onChange={this.adddtask} placeholder="add task" id="description" name="description"/>
                <button className="btn btn-primary m-4" type="button" onClick={this.addtasklist} id="btnupdate">
                    Add
                </button></div>
                <ul id="todolist">
                    </ul>
                    <table id="todolist" className="table table-striped">
                        <thead>
                        <tr><th>Sno</th><th>Topic</th><th>Description</th><th>Events</th></tr></thead>
                        <tbody id="todolistbody">

                        </tbody>
                        
                        </table>
                <hr/>
            </div>
        )
    }
}

export default Todo
