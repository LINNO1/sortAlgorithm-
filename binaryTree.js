function BinaryTree(){
   var root=null;
   function creatNode(val){
        this.val=val;
        this.left=null;
        this.right=null;
   }
   function insertNode(node,newNode){
      if(newNode.val<node.val){
          if(node.left==null){
            node.left=newNode;
          }else{
            insertNode(node.left,newNode)
          }
      }else{
        if(node.right==null){
            node.right=newNode;
          }else{
            insertNode(node.right,newNode)
          }
      }
   }
   function preOrderTraversal(node,callback){
     if(node!=null){
      callback(node.val);
      preOrderTraversal(node.left,callback);
      preOrderTraversal(node.right,callback);
     }
   }
   function inOrderTraversal(node,callback){
    if(node!=null){
      inOrderTraversal(node.left,callback);
      callback(node.val);
      inOrderTraversal(node.right,callback);
    }
  }
   function postOrderTraversal(node,callback){
    if(node!=null){
      postOrderTraversal(node.left,callback);
      postOrderTraversal(node.right,callback);
      callback(node.val);
    }
  }

  function minNode(node){
      if(!node){return null}
      while(node!=null&&node.left!=null){
        node=node.left;
      }
      return node.val;
  }
   function findMinNode(node){
      if(!node){return null}
      while(node!=null&&node.left!=null){
        node=node.left;
      }
      return node;
  }
    function maxNode(node){
      if(!node){return null}
      while(node!=null&&node.right!=null){
        node=node.right;
      }
      return node.val;
  }
  function searchNode(node,val){
    if(!node){ return false;}
    if(val<node.val){
      return searchNode(node.left,val)
    }else if(val>node.val){
      return searchNode(node.right,val)
    }else{
      return true;
    }
  }
  function removeNode(node,val){
    if(node===null){
      return null;
    }
    if(val<node.val){
      node.left=removeNode(node.left,val);
      return node;
    }else if(val>node.val){
      node.right=removeNode(node.right,val);
      return node;
    }else{
      if(node.left===null&&node.right===null){
        node=null;
        return null;
      }
      if(node.left===null){
      /*  var nn=node.right;
        node=null;
        return nn;*/
        node=node.right;
        return node;
      }
      if(node.right===null){
        node=node.left;
        return node;
      }
      var min=findMinNode(node.right);
      node.val=min.val;
      node.right=removeNode(node.right,node.val);
      return node

    }

  }



  /*-----------------构造排序二叉树--------------------------------*/
  this.insert=function(val){
        var newNode=new creatNode(val)
        if(root==null){
           root=newNode;
        }else{
          insertNode(root,newNode);
        }
     }
  /*---------------------遍历排序二叉树，递归方法---------------------------*/
  this.preOrderTraverRecur=function(callback){
     preOrderTraversal(root,callback);

  }
  this.inOrderTraverRecur=function(callback){
    inOrderTraversal(root,callback);
  }
  this.postOrderTraverRecur=function(callback){
    postOrderTraversal(root,callback);
  }
  /*------------------------遍历排序二叉树，非递归方法--------------------------*/
  this.preOrderTraver=function(){
    var p=root;
    var stack=[];
    var preVal=[];
    if(root==null){
      return [];
    }
    while(stack.length!=0||p!=null){
      if(p!=null){
         stack.push(p);
         preVal.push(p.val);
         p=p.left;
      }else{
         if(stack.length!=0){
           p=stack.pop();
           p=p.right;
         }
      }      
    }
     
   return preVal;
  }
  this.inOrderTraver=function(){
    var p=root;
    var stack=[];
    var inorderVal=[];
    if(root==null){
      return [];
    }
    while(stack.length!=0||p!=null){
      if(p!=null){
         stack.push(p);
         p=p.left;
      }else{
         if(stack.length!=0){
           p=stack.pop();
           inorderVal.push(p.val);
           p=p.right;
         }
      }      
    }
     
   return inorderVal;
  }
  this.postOrderTraver=function(){
    var p;
    var stack=[];
    var postorderVal=[];
    if(root==null){
      return [];
    }
     stack.push(root);
     while(stack.length!=0){
         p=stack.pop();
         postorderVal.push(p.val);
         if(p.left){
          stack.push(p.left);
         }
         if(p.right){
          stack.push(p.right);
         }
     }          
   return postorderVal.reverse();
  }
/*------------------------二叉树的查找算法--------------------------*/ 
/*----找最小值-----------*/
   this.min=function(){
     return minNode(root);
   }

/*----找最大值-----------*/
  this.max=function(){
     return maxNode(root);
   }
/*----找特定值-----------*/
  this.search=function(val){
    return searchNode(root,val);
  }
/*------------------------二叉树的删除算法--*/
   this.remove=function(val){
     root=removeNode(root,val)
   }

}















/*构造二叉树*/
var nodeData=[17,2,22,1,6,7,43,5,3,76,32]
var binarytree=new BinaryTree();
nodeData.forEach(function(ele){
    binarytree.insert(ele);
})
var xxx=[]
function print(xx){
  xxx.push(xx);
}
/*binarytree.preOrderTraverRecur(print);

binarytree.inOrderTraverRecur(print);*/

binarytree.postOrderTraverRecur(print);
console.log(xxx);
/*console.log(binarytree.preOrderTraver());
console.log(binarytree.inOrderTraver());*/
console.log(binarytree.postOrderTraver());
/*console.log(binarytree.max());
console.log(binarytree.min());*/
/*console.log(binarytree.search(17));
console.log(binarytree.search(7));
console.log(binarytree.search(127));*/
binarytree.remove(17);
console.log(binarytree.postOrderTraver());


/*function sum2(x){
  return function(y){
    return x+y;
  }
}

console.log(sum2(3)(4))*/

/*var Arr=[
{ id: 1, parent: null},
{ id: 2, parent: 1},
{ id: 3, parent: 2}
  ]



function ArrToObj(Arr){
    var obj1={};
    var obj={};
    for(var i=Arr.length-1;i>=0;i--){
            obj1=obj;
            obj={};
        for(var key in Arr[i]){
            obj[key]=Arr[i][key];            
        }
        if(i!=Arr.length-1){
            obj.child=obj1;
        }
    }
    obj1=obj;
   console.log({ obj2: obj1}) 
}

ArrToObj(Arr)*/