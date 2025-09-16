/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  var reverse = (li, k) => {
    const head = new ListNode(undefined, undefined);
    let p = li;
    let q;
    let tail = li;
    let time = 0;
    while (time < k) {
      if (time === 0) {
        tail = p;
      }
      q = p.next;
      p.next = head.next;
      head.next = p;
      p = q;
      time += 1;
    }
    return {
      n: q,
      h: head.next,
      t: tail,
    };
  };
  var getLen = (li) => {
    let n = 0;
    let p = li;
    while (p) {
      n += 1;
      p = p.next;
    }
    return n;
  };
  const len = getLen(head);
  const opTime = Math.floor(len / k);
  let time = 0;
  let nextHead = head;
  let res = new ListNode(undefined, undefined);
  let prevTail = res;
  while (time < opTime) {
    const { n, h, t } = reverse(nextHead, k);
    prevTail.next = h;
    prevTail = t;
    nextHead = n;
    time += 1;
  }
  prevTail.next = nextHead;
  return res.next;
};

function arrayToList(arr) {
  let dummy = new ListNode();
  let current = dummy;
  for (let num of arr) {
    current.next = new ListNode(num);
    current = current.next;
  }
  return dummy.next;
}

let head = arrayToList([1, 2, 3, 4]);
let res = reverseKGroup(head, 1);
