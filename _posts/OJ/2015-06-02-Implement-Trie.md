---
layout: post
title: Implement Trie
category: OJ
tags: DataStructrue Trie 
---
##问题描述
Implement a trie with `insert`, `search`, and `startsWith` methods.  
**Note:**  
You may assume that all inputs are consist of lowercase letters `a-z`.  

##Trie
###定义
Trie这个术语来自于retrieval。根据词源学，trie的发明者Edward Fredkin把它读作英语发音"tree",但更为习惯的读法是"try"。这个问题要我们实现的是字典树。很多时候我们习惯把Trie直接等同于字典树，其实不然，Trie较之字典树更加抽象。
Trie可以定义如下：
>Any data structrue based on key space decomposition called a trie.
翻译过来就是，任何一种基于键值空间分解的数据结构称之为trie。说得有点玄乎，什么是key space呢？这里不得不提出另一个相关的概念：object space。我们通过两个例子来理解。BST是一种典型的基于object space decomposition的数据结构，在BST中的每个节点都存有一个实际的object值，其空间（节点）的分布是与object直接相关的，相同的值按照不同的顺序插入，所生成的BST是不相同的。而字典树则不然，其空间的分布是确定的，每个节点都有26个子节点，相同的元素按照按照不同的顺序插入，所生成的字典树是一样的。字典树中每个节点不不是存储object(单词)，而是key(字母)。因此我们可以说，字典树是Trie的一种。
###应用
trie树常用于搜索提示。如当输入一个网址，可以自动搜索出可能的选择。当没有完全匹配的搜索结果，可以返回前缀最相似的可能。
##代码
