

var get_tile_id=function(c,r){
	return 'C'+c+'_'+r;
	}
	
	var get_nbr_id=function(c,r){
		return 'nbr_'+c+'_'+r;
	}


var curr_highlight=null;

var highlight=function(el){
	if(curr_highlight!=null){
		console.log(curr_highlight.id);
		curr_highlight.style.borderWidth=1;
	}
	console.log('higlight '+el.id);
	//var el=document.getElementById(elid);
	el.style.borderWidth=4;
	el.style.back
	
	
	curr_highlight=el;
}



var randomize_table=function(){
	var r,c,v;
	for(r=0;r<Y;r++){
		for(c=0;c<X;c++){	
			if(Math.random()<0.5){
				v=LIVE;
			}
			else
				v=DEAD;
			var t_id=get_tile_id(c,r);
			
			var cell=document.getElementById(t_id);
			cell.innerHTML=v;
			update_cell_colors(cell);
			
		}
	}
	calcNextState();
}

var paint=function(cell){
    if(paint_value!=null){
        cell.innerHTML=paint_value;
        update_cell_colors(cell);
    }
}

var gencell=function(cell,c,r,v){

    cell.setAttribute('onclick','invertvalue(this)');
    cell.setAttribute('onmouseenter','paint(this)');
	cell.setAttribute('id',get_tile_id(c,r));
	cell.innerHTML=v;
}

var gentable=function(){
	var r;var c;
	var tbl=document.getElementById('tbl');
	
	for(r=0;r<Y;r++){
		var row=tbl.insertRow(r);
		for(c=0;c<X;c++){
			var cell=row.insertCell(c);
			gencell(cell,c,r,DEAD);
		}
	}	
};


var gennbr=function(){
	var r;var c;
	var tbl=document.getElementById('nbr');
	
	//for every cell calc next state and add to nextstate array
	for(r=0;r<Y;r++){
		var row=tbl.insertRow(r);
		for(c=0;c<X;c++){
			var cell=row.insertCell(c);
			cell.setAttribute('id','nbr_'+r+'_'+c);
			cell.innerHTML='0';
			cell.setAttribute('onmouseenter','highlight('+get_tile_id(r,c)+')');
		}
	}
};

var update_cell_colors=function(cell){
	
	switch(cell.innerHTML){
		case LIVE:
			cell.style.backgroundColor=color_LIVE;
			cell.style.color=color_LIVE;
			break;
		case DEAD:
			cell.style.backgroundColor=color_DEAD;
			cell.style.color=color_DEAD;
			break;
		default:console.log("applynextstate error: unexpected state "+cell.innerHTML);
	}
}

var update_all_cell_colors=function(){
	var i,j;
	for(i=0;i<X;i++)
		for(j=0;j<Y;j++)
			update_cell_colors(document.getElementById(get_tile_id(i,j)));
}


var invertvalue=function(el){
	if(LIVE==el.innerHTML)
		el.innerHTML=DEAD;
	else 
		el.innerHTML=LIVE;
	
	update_cell_colors(el);
	calcNextState();
}


var get=function(x,y){
	var res;
	id=get_tile_id(x,y);
	
	var el=document.getElementById(id);
	if(el)res= el.innerHTML;
	else res= 0;
	
	return res;
}

var get_neighbors_of=function(c,r){
	res=[];
	var cli,clj;
	for(cli=c-1;cli<=c+1;cli++){
		for(clj=r-1;clj<=r+1;clj++){
			var el=document.getElementById(get_tile_id(cli,clj));
			if(el)res.push(el);
		}
	}
	return res;
}

var countLiveNbr=function(c,r){
	var res=0;

	var neighbors=get_neighbors_of(c,r);
	for(n=0;n<neighbors.length;n++)
		if(neighbors[n].innerHTML!=DEAD)
			res+=1;

	res-=get(c,r);

	var nbr_tile=document.getElementById(get_nbr_id(r,c));
	nbr_tile.style.backgroundColor=color_neighbor_count[res];
	if(nbr_tile)
		nbr_tile.innerHTML=res;
	return res;
}




var calcNextStateOf=function(c,r){
	live=countLiveNbr(c,r);
	var ns=DEAD;
	//console.log(ii+','+jj+':'+live);
	switch(live){
		case 0:
		case 1:ns=DEAD;break;
		case 2:ns=get(c,r);break;
		case 3:ns=LIVE;break;
		case 4:
		case 5:
		default:ns=DEAD;break;
	}
	return ns;
}

var calcNextState=function(){
	//for every cell calc next state and add to nextstate array
	for(ii=0;ii<X;ii++){
		for(jj=0;jj<Y;jj++){
			var nextvalue=calcNextStateOf(ii,jj);
			nextstate.push({x:ii,y:jj,v:nextvalue});
		}
	}
}



/**
 * apply calculated triplets{x,y,v} from nextstate array to board
 * update colors of board
 * reset nextstate array
 */
function applyNextState(){
	for(iii=0;iii<nextstate.length;iii++){
		el=nextstate[iii];
		del=document.getElementById(get_tile_id(el.x,el.y));
		del.innerHTML=el.v;
		update_cell_colors(del);
		
	}
	nextstate=[];
}


var toggle_run=function(){

	run = !run;
	if(run)
	document.getElementById('bt_run').innerHTML='pause';
	else
	document.getElementById('bt_run').innerHTML='run';
}


/**
 * what happens in every turn
 */
var tick=function(){
	if(true==run){
		applyNextState();
		calcNextState();
	}
}

