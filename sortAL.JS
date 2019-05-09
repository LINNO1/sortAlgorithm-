//交换a,b的值
function swap(arr,i,j){
	/*arr[i]=arr[i]-arr[j];
	arr[j]=arr[i]+arr[j];
	arr[i]=arr[i]-arr[j];*/

	var t=arr[i];
	arr[i]=arr[j];
	arr[j]=t;
}

/*------------------------插入排序-------------------------------------*/
/*---------------------插入排序：稳定 比较  O(N^2)  O(1)--------------------*/
var arr=[5,6,3,1,8,11,23,1,2]
function insertSort(arr){
    console.log('------insertSort---------')
	for(var i=1;i<arr.length;i++){
		var cur=arr[i];
		for(var j=i-1;j>=0;j--){
			if(cur<arr[j]){
				arr[j+1]=arr[j];
				arr[j]=cur;
			}else{
	           break;
			}
              
		}
		//arr[j+1]=cur;
		console.log(arr);
	}
	return arr;
}
insertSort(arr);
/*----------------希尔排序(插入排序改进版,设个步长) 不稳定 比较--------------------*/
function shellSort(arr){
	var half = parseInt(arr.length/2); 
	console.log('------shellSort---------')
	for(let d=half;d>=1;d=parseInt(d/2) ){//计算每次插入排序的步长
		//以下为 步长为d 的插入排序 
		for(let i=d;i<arr.length;i++){
			var cur=arr[i];
			for(let j=i-d;j>=0;j-=d){
				//交换二者的值
				if(cur<arr[j]){
				   arr[j+d]=arr[j];
				   arr[j]=cur;
			  }else{
	           break;
			}
		 }
		}
			console.log(arr);
	}
	return arr;

}
shellSort(arr);
/*--------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------
/*---------------------选择排序：不稳定 比较 --------------------*/
function selectSort(arr){
	console.log('------selectSort---------')
	for(let i=0;i<arr.length;i++){
		let index = i;
		for(let j=i;j<arr.length;j++){
			if(arr[j] < arr[index]){
				index = j;
			}
		}
		swap(arr,i,index);
		console.log(arr);		
	}
	return arr;
}


selectSort(arr);
/*---------------------堆排序(选择排序的一种)：不稳定 比较 --------------------*/

//堆排序
function heapSort(arr){
	var len = arr.length;
	console.log('------heapSort---------')
	//构建二叉堆
	/*思路*/
	var sift = function(out, k, m){
		let i = k, j = 2*k+1; //j为左孩子的下标，j+1为右孩子
		while(j <= m && j!=len){  //如果该节点有子节点(即判断左孩子的坐标是否小于数组的长度)
			// 先判断右节点是否存在，先对左右节点对比，选出大的
			if(j<m && out[j+1] && out[j] < out[j+1]){
				j++;
			}
			//大的节点再和该父节点比较
			if(out[i] > out[j]){
				break;
			}else{		
			//交换位置及记录下标		
				swap(out,i,j)
				i = j;
				j = 2*i+1;
			}
		}
	}
	let half = parseInt(len/2);

	//1. 初始建堆
    /* 构建最大二叉堆思路： 从非叶子节点(从arr.length-1 开始 到 0,都有子节点)起，比较其与孩子节点的值，最大的作为为父子节点*/
	
	for(let i=half-1;i>=0;i--){
		sift(arr, i, len);
		console.log('建堆完毕')
		console.log(arr);
	}



    //2. 建堆之后，根节点的值最大，然后交换根节点与最后一个节点的位置 3. 从0-len-2 重新建堆
	for(let i=0;i<len-1;i++){
		//交换第一个和最后一个(len-i)的位置
		swap(arr,0,len-1-i)
		console.log(arr);
		//最后一个站定，其余的继续构建二叉堆,从0开始
		sift(arr, 0, len-1-i-1);//****************只要一次就可，***************
	}
	return arr;
}
/*--------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------
/*---------------------计数：稳定 非比较 --------------------*/
function countSort(A){
    const max = Math.max.apply(null,A)
    let B = Array.from({length:max+1}).fill(0); //创建累计数组，并填充0,比A的长度多1 
    let C = new Array(); //创建回写数组
 
    A.forEach( (ele,i) => B[A[i]]++) //累计数组频次计算
 
    for(let i=1; i<B.length; i++){
        B[i] = B[i-1]+B[i] //累计数组占位累计
    }
 
    for(let i=0; i<A.length; i++){
        const p = B[A[i]]-1; //记录回写位置
        B[A[i]]-- //新回写位置
        C[p] = A[i]
    }
    return C
}

/*---------------------桶：稳定 非比较 --------------------*/

function bucketSort(arr){
	//用一个桶来统计每个数字出现的频率，桶长为 Math.max(null,arr)
	//即桶数组的下标为该数的值，该下标对应的元素为该数出现的频率
	var distribute = function(arr){
		var bucket = [];
		for(let i=0;i<arr.length;i++){
			let m = arr[i];
			if(bucket[m] === undefined){
				bucket[m] = 1;
			}else{
				bucket[m]++;
			}
		}
		return bucket;
	}
	//遍历这个桶
	var collect = function(bucket){
		var out = [], index = 0;
		for(let i=0;i<bucket.length;i++){
			let temp = bucket[i]; //temp 为频率
			while(temp>=1){
				out[index++] = i; //下标为值，放到排好的数组中
				temp--;
			}
		}
		return out;
	}
	var buckets = distribute(arr);
	var out = collect(buckets);
	return out;

}

/*---------------------基数：不稳定 非比较 --------------------*/
function radixSort(arr,type,showSort){
	//计算所有数中最大的是几位数
	var getMaxPow = function(out){
		//求所有数中最大的
	    var max=Math.max.apply(null,arr);
		//计算所有数中最大的是几位数
		var max_pow = 1;
		while(max>=10){
			max_pow++;
			max = parseInt(max/10);
		}
		return max_pow;
	}
	//升序，分配
	//pow 为 10^i
	var distribute = function(out, pow){
		var queue = [];
		for(let i=0;i<out.length;i++){
			let m = parseInt(out[i]/pow)%10; //把该位上的数取出来
			//queue是个二维数组
			if(Object.prototype.toString.call(queue[m]) !== "[object Array]"){
				queue[m] = [];
			}
			queue[m].push(out[i]);
		}
		return queue;
	}

/* 二维数组
	queue=[
	  [],
	  [],
	  [],...
	]*/
	//升序，收集
	var collect = function(queue){
		var out = [];
		for(let i=0;i<10;i++){
			while(queue[i]!==undefined && queue[i].length>0){
				out.push(queue[i].shift()); //队列，先进先出
			}
		}
		return out;
	}
	var max_pow = getMaxPow(arr);
	var queue = [], output = [];
	//从个位开始到最高位置，进行分配和收集
	for(let i=0;i<max_pow;i++){
		queue = distribute(arr,Math.pow(10,i));
		output = collect(queue);
	}
	return output;

}
/*--------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------

/*---------------------归并： 稳定 非比较 --------------------*/
function mergeSort(arr,type,showSort){
	//一次归并算法
	var merge = function(out, array, s, m, t){
		let i=s, j=m+1, k=s;//i:左边数组的索引，j:右边数组的索引，k:归并结果数组的索引
		//没有数组遍历完
		while(i<=m && j<=t){
			if(out[i] < out[j]){
				array[k++] = out[i++];
			}else{
				array[k++] = out[j++];
			}
		}
		//如果左数组没有遍历完，将左数组剩余数据压入arr
		if(i<=m){
			while(i<=m){
				array[k++] = out[i++];
			}
		}else{
			while(j<=t){
				array[k++] = out[j++];
			}
		}
		return array;
	}
	//一趟归并排序算法
	var mergePass = function(out, array, h){
		var len = out.length;
		let i = 0;
		while(i+2*h<=len){
			merge(out, array, i , i+h-1, i+2*h-1);
			i += 2*h;
		}
		if(i+h<len){
			merge(out, array, i, i+h-1, len-1);
		}else{
			while(i<len){
				array[i] = out[i];
				i++;
			}
		}
		return array;
	}
	//非递归归并排序
	var mergeSortUnrecursion = function(out){
		var len = out.length;
		var array = [];
		for(let i=0;i<arr.length;i++){
			array[i] = out[i];
		}
		var h = 1;
		while(h<len){
			mergePass(out, array, h);
			h = 2*h;
			mergePass(array, out, h);
			h = 2*h;
		}
		return out;
	}
	//递归归并排序
	var mergeSortRecursion = function(out,array, s, t){
		if(s === t){
			array[s] = out[s];
		}else{
			let m = parseInt((s+t)/2);
			mergeSortRecursion(out, array, s, m);
			mergeSortRecursion(out, array, m+1, t);
			merge(array, out, s, m, t);
			//将out复制给array,继续下一轮归并
			for(let i=0;i<out.length;i++){
				array[i] = out[i];
			}
		}
		return out;
	}
	var array = [];
	return mergeSortRecursion(arr,array, 0, arr.length-1);
}

/*------------------------------交换排序--------------------------------------------------------------
/*--------------------------------------------------------------------------------------------
/*-----冒泡：稳定 比较----------------*/
function bubbleSort(arr){
	console.log('---bubbleSort----')
	for(let i=1;i<arr.length;i++){
		for(let j=0;j<arr.length-i;j++){
			if(arr[j] > arr[j+1]){
				swap(arr,j,j+1)
			}
		}
	}
	return arr;
}

/*-----快速：不稳定 比较----------------*/
function quickSort(arr, left, right) {
    var len = arr.length,
        partitionIndex, //基准数
        left = typeof left != 'number' ? 0 : left,
        right = typeof right != 'number' ? len - 1 : right;
 
    if (left < right) {
        partitionIndex = partition(arr, left, right);
        quickSort(arr, left, partitionIndex-1);
        quickSort(arr, partitionIndex+1, right);
    }
    return arr;
}
 
function partition(arr, left ,right) {     // 分区操作
    var pivot = left,                      // 设定基准值（pivot）,选第一个数为基准
        index = pivot + 1;    //作为比基准值 arr[pivot]小的值的坐标，则index
    for (var i = index; i <= right; i++) { // 后面的数与基准值比较
        if (arr[i] < arr[pivot]) {
            swap(arr, i, index); //交换
            index++;  
            /*注意： 3 2 5 1 4 2 6
                 1： 3 2 5 1 4 2 6
                 2； 3 2 5 1 4 2 6
                 3： 3 2 1 5 4 2 6    
                 4： 3 2 1 5 4 2 6
                 5： 3 2 1 2 4 5 6
             循环结束后：2 2 1 3 4 5 6 (交换 pivot 和 index-1)

            */
        }       
    }
    swap(arr, pivot, index - 1);  
    console.log(arr);
    return index-1;  /*返回基准值下标*/
}
/*function quickSort(arr){
	console.log('---quickSort----')
	//快速排序
	function quick(out,first,end){
		if(first<end){
			let i=first, j=end;
			//一个循环完成一趟扫描
			while(i<j){
				while(i<j&& out[i]< out[j]){
					j--;
				}
				if(i<j){
					swap(out,i,j);		
					i++;
				}
				while(i<j&& out[i] < out[j]){
					i++;
				}
				if(i<j){
					swap(out,i,j);	
					j--;
				}
			}
			quick(out,first,i-1);
			quick(out,i+1,end);
		}
		return out;
	}
	return quick(arr,0,arr.length-1);

}*/

/*------------------------------二叉树排序------------------*/
function binaryTreeSort(arr){
	console.log('二叉树排序')
    var root=null;
  /*建立排序二叉树*/
    arr.forEach(function(ele){
    	creatTree(ele);
    })
 /*中序遍历二叉树*/
   inorderTrave(root);
   inorderTraveRecur(root);



	function createNode(val){
        this.val=val;
        this.left=null;
        this.right=null;
	}
	function creatTree(val){
       var newNode=new createNode(val);
       if(root===null){ root=newNode; return;}
       creatTreeNode(root,newNode);
	}
   function creatTreeNode(node,newNode){
     if(newNode.val<node.val){
     	 if(node.left===null){
     	 	node.left=newNode;
     	 }else{
     	 	creatTreeNode(node.left,newNode)
     	 }
     }else{
     	 if(node.right===null){
     	 	node.right=newNode;
     	 }else{
     	 	creatTreeNode(node.right,newNode)
     	 }
    }
  }

  function inorderTraveRecur(node){
  	
  	if(node!=null){
     inorderTrave(node.left);
     console.log(node.val);
     inorderTrave(node.right)
   }
 }

 function inorderTrave(node){
 	console.log('非递归')
 	var stack=[];
 	var valArr=[];
 	while(node!=null || stack.length!=0){
 		while(node!=null){
 			stack.push(node);
 			node=node.left;
 		}
 		if(stack.length!=0){
 			node=stack.pop();
 			console.log(node.val);
 			node=node.right;
 		} 	 
   }
 }
}

var xxx=[21,23,1,32,45,2,65,755,15,24,22];
binaryTreeSort(xxx)