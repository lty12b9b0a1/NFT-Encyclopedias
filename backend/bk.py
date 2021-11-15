# import io
import os
# import cv2
# import json
# import zipfile
import pymysql
from flask import Flask, request, jsonify
from flask_cors import CORS


db = pymysql.connect(host="127.0.0.1",
                     user="root",
                     password="root",
                     database="bk")
cursor = db.cursor()


# 后端服务启动
app = Flask(__name__)
CORS(app, resources=r'/*')  # 解决跨域问题


@app.route('/bodyimage_upload', methods=['POST', 'GET'])
def bodyimage_upload():
    if request.method == "POST":
        file = request.files.get('file')
        timestamp = request.form.get('timestamp')
        file.filename = "0" + '_' + str(timestamp) + '_' + file.filename
        print(timestamp)
        file_path = '../FrontEndFinal-main/public/resources/bodyimage/' + file.filename
        if os.path.exists(file_path):
            return {'msg': '该文件已存在'}
        else:
            file.save(file_path)
            return '../resources/bodyimage/' + file.filename
    else:
        return "get~"


@app.route('/create_entry', methods=['POST', 'GET'])
def create_entry():
    entryname = request.form.get("entryname"),
    entrylist1 = request.form.get("entrylist1")
    entrylist2 = request.form.get("entrylist2")
    owner = request.form.get("owner")
    creator = request.form.get("creator")
    list1 = eval(entrylist1)
    list2 = eval(entrylist2)
    cursor.execute("select entry_name from entry_info where entry_name = '%s'" % (entryname))
    data = cursor.fetchone()
    if data is not None:
        print("Duplicate entryname exists")
        return "-2"
    entryoverview = request.form.get("entryoverview"),
    entrybody = request.form.get("entrybody"),
    file = request.files.get("file")
    cursor.execute("select max(id) from entry_info")
    lastinsert = cursor.fetchone()
    entryimgurl = "/resources/img/"+str(lastinsert[0])+"_"+file.filename
    file_path = '../FrontEndFinal-main/public'+entryimgurl
    if os.path.exists(file_path):
        print('msg:该文件已存在')
    else:
        file.save(file_path)
    try:
        cursor.execute(
            "insert into entry_info(entry_name,entry_overview,entry_imgurl,entry_body,owner,creator,onsale,price,start_time,end_time) values (%s, %s, %s, %s, %s,%s, %s, %s, %s, %s)",
            (entryname, entryoverview, entryimgurl, entrybody, owner, creator, 0, 0, 0, 0))
        db.commit()  # 提交，使操作生效
        cursor.execute("select max(id) from entry_info")
        result = cursor.fetchone()
        db.commit()  # 提交，使操作生效
        try:
            cursor.execute("insert into entry_ownerhistory(eid, owner) values (%s, %s)", (result[0], owner))
            db.commit()  # 提交，使操作生效
        except Exception as e:
            print("insert ownerhistoryfail:", e)
            db.rollback()  # 发生错误就回滚
            return "-1"
        for i in range(len(list1)):
            try:
                cursor.execute("insert into info_itemlist1(eid, item_name, item_content) values (%s, %s, %s)", (result[0], list1[i]["itemname"], list1[i]["itemcontent"]))
                db.commit()  # 提交，使操作生效
            except Exception as e:
                print("insert item1 fail:", e)
                db.rollback()  # 发生错误就回滚
                return "-1"
        for i in range(len(list2)):
            try:
                cursor.execute("insert into info_itemlist2(eid, item_name, item_content) values (%s, %s, %s)", (result[0], list2[i]["itemname"], list2[i]["itemcontent"]))
                db.commit()  # 提交，使操作生效
            except Exception as e:
                print("insert item2 fail:", e)
                db.rollback()  # 发生错误就回滚
                return "-1"
        print("cteate successfully!")
        return str(result)
    except Exception as e:
        print("Create task failed:", e)
        db.rollback()  # 发生错误就回滚
        return "-1"


@app.route('/get_entry', methods=['POST', 'GET'])
def get_entry():
    cursor.execute(
        "select entry_name,entry_imgurl,entry_overview,owner,creator,onsale,price,id from entry_info"
    )
    data = cursor.fetchall()
    temp = {}
    result = []
    if data is not None:
        for i in data:
            temp["entryname"] = i[0]
            temp["entryimgurl"] = i[1]
            temp["entryoverview"] = i[2]
            temp["owner"] = i[3]
            temp["creator"] = i[4]
            temp["onsale"] = i[5]
            temp["price"] = i[6]
            temp["id"] = i[7]
            result.append(temp.copy())  # 特别注意要用copy，否则只是内存的引用
        print("result:", len(data))
        return jsonify(result)
    else:
        print("result: NULL")
        return jsonify([])


@app.route('/get_entryinfo', methods=['POST', 'GET'])
def get_entryinfo():
    entryname = request.form.get("entryname")
    cursor.execute(
        "select id,entry_name,entry_imgurl,entry_overview,owner,creator,onsale,price from entry_info where entry_name=%s", (entryname)
    )
    data = cursor.fetchone()
    if data is not None:
        print("getsuccess")
    else:
        print("getfail,not found entry")
        return "-2"
    temp1 = {}
    result = []
    print(data)
    temp1["eid"] = data[0]
    temp1["entryname"] = data[1]
    temp1["entryimgurl"] = data[2]
    temp1["entryoverview"] = data[3]
    temp1["owner"] = data[4]
    temp1["creator"] = data[5]
    temp1["onsale"] = data[6]
    temp1["price"] = data[7]
    result.append(temp1.copy())
    # if data2 is not None:
    #     for i in data2:
    #         temp2["entryname"] = i[0]
    #         result.append(temp2.copy())  # 特别注意要用copy，否则只是内存的引用
    return jsonify(result)
    # else:
    #     print("result: NULL")
    #     return jsonify([])


@app.route('/get_itemlist1', methods=['POST', 'GET'])
def get_itemlist1():
    eid = request.form.get("eid")
    print(eid)
    cursor.execute(
        "select item_name,item_content from info_itemlist1 where eid=%s", (eid)
    )
    data = cursor.fetchall()
    temp = {}
    result = []
    if data is not None:
        for i in data:
            temp["itemname"] = i[0]
            temp["itemcontent"] = i[1]
            result.append(temp.copy())  # 特别注意要用copy，否则只是内存的引用
        return jsonify(result)
    else:
        print("result: NULL")
        return jsonify([])


@app.route('/get_itemlist2', methods=['POST', 'GET'])
def get_itemlist2():
    eid = request.form.get("eid")
    print(eid)
    cursor.execute(
        "select item_name,item_content from info_itemlist2 where eid=%s", (eid)
    )
    data = cursor.fetchall()
    temp = {}
    result = []
    if data is not None:
        for i in data:
            temp["itemname"] = i[0]
            temp["itemcontent"] = i[1]
            result.append(temp.copy())  # 特别注意要用copy，否则只是内存的引用
        return jsonify(result)
    else:
        print("result: NULL")
        return jsonify([])


@app.route('/get_ownerhistory', methods=['POST', 'GET'])
def get_ownerhistory():
    eid = request.form.get("eid")
    cursor.execute(
        "select owner from entry_ownerhistory where eid=%s", (eid)
    )
    data = cursor.fetchall()
    temp = {}
    result = []
    if data is not None:
        for i in data:
            temp["owner"] = i[0]
            result.append(temp.copy())  # 特别注意要用copy，否则只是内存的引用
        return jsonify(result)
    else:
        print("result: NULL")
        return jsonify([])


@app.route('/get_entrybody', methods=['POST', 'GET'])
def get_entrybody():
    eid = request.form.get("eid")
    cursor.execute(
        "select entry_body from entry_info where id=%s", (eid)
    )
    data = cursor.fetchone()
    return data[0]


@app.route('/update_entry', methods=['POST', 'GET'])
def update_entry():
    entryname = request.form.get("entryname"),
    entrylist1 = request.form.get("entrylist1")
    entrylist2 = request.form.get("entrylist2")
    list1 = eval(entrylist1)
    list2 = eval(entrylist2)
    entryoverview = request.form.get("entryoverview"),
    entrybody = request.form.get("entrybody"),
    file = request.files.get("file")
    if file is not None:
        cursor.execute("select id from entry_info where entry_name=%s", (entryname))
        lastinsert = cursor.fetchone()
        entryimgurl = "/resources/img/"+str(lastinsert[0])+"_"+file.filename
        file_path = '../FrontEndFinal-main/public'+entryimgurl
        if os.path.exists(file_path):
            print('msg:该文件已存在')
        else:
            file.save(file_path)
        if entryoverview is not None:
            try:
                cursor.execute(
                    "update entry_info set entry_overview=%s,entry_imgurl=%s,entry_body=%s where entry_name=%s",
                    (entryoverview, entryimgurl, entrybody, entryname))
                db.commit()  # 提交，使操作生效
                cursor.execute("select id from entry_info where entry_name=%s", (entryname))
                result = cursor.fetchone()
                db.commit()  # 提交，使操作生效
                cursor.execute("delete from info_itemlist1 where eid=%s", (result[0]))
                db.commit()
                cursor.execute("delete from info_itemlist2 where eid=%s", (result[0]))
                db.commit()
                for i in range(len(list1)):
                    try:
                        cursor.execute("insert into info_itemlist1(eid, item_name, item_content) values (%s, %s, %s)", (result[0], list1[i]["itemname"], list1[i]["itemcontent"]))
                        db.commit()  # 提交，使操作生效
                    except Exception as e:
                        print("insert item1 fail:", e)
                        db.rollback()  # 发生错误就回滚
                        return "-1"
                for i in range(len(list2)):
                    try:
                        cursor.execute("insert into info_itemlist2(eid, item_name, item_content) values (%s, %s, %s)", (result[0], list2[i]["itemname"], list2[i]["itemcontent"]))
                        db.commit()  # 提交，使操作生效
                    except Exception as e:
                        print("insert item2 fail:", e)
                        db.rollback()  # 发生错误就回滚
                        return "-1"
                print("cteate successfully!")
                return str(result)
            except Exception as e:
                print("Create task failed:", e)
                db.rollback()  # 发生错误就回滚
                return "-1"
        else:
            try:
                cursor.execute(
                    "update entry_info set entry_imgurl=%s,entry_body=%s where entry_name=%s",
                    (entryimgurl, entrybody, entryname))
                db.commit()  # 提交，使操作生效
                cursor.execute("select id from entry_info where entry_name=%s", (entryname))
                result = cursor.fetchone()
                db.commit()  # 提交，使操作生效
                cursor.execute("delete from info_itemlist1 where eid=%s", (result[0]))
                db.commit()
                cursor.execute("delete from info_itemlist2 where eid=%s", (result[0]))
                db.commit()
                for i in range(len(list1)):
                    try:
                        cursor.execute("insert into info_itemlist1(eid, item_name, item_content) values (%s, %s, %s)", (result[0], list1[i]["itemname"], list1[i]["itemcontent"]))
                        db.commit()  # 提交，使操作生效
                    except Exception as e:
                        print("insert item1 fail:", e)
                        db.rollback()  # 发生错误就回滚
                        return "-1"
                for i in range(len(list2)):
                    try:
                        cursor.execute("insert into info_itemlist2(eid, item_name, item_content) values (%s, %s, %s)", (result[0], list2[i]["itemname"], list2[i]["itemcontent"]))
                        db.commit()  # 提交，使操作生效
                    except Exception as e:
                        print("insert item2 fail:", e)
                        db.rollback()  # 发生错误就回滚
                        return "-1"
                print("cteate successfully!")
                return str(result)
            except Exception as e:
                print("Create task failed:", e)
                db.rollback()  # 发生错误就回滚
                return "-1"
    else:
        if entryoverview is not None:
            try:
                cursor.execute(
                    "update entry_info set entry_overview=%s,entry_body=%s where entry_name=%s",
                    (entryoverview, entrybody, entryname))
                db.commit()  # 提交，使操作生效
                cursor.execute("select id from entry_info where entry_name=%s", (entryname))
                result = cursor.fetchone()
                db.commit()  # 提交，使操作生效
                cursor.execute("delete from info_itemlist1 where eid=%s", (result[0]))
                db.commit()
                cursor.execute("delete from info_itemlist2 where eid=%s", (result[0]))
                db.commit()
                for i in range(len(list1)):
                    try:
                        cursor.execute("insert into info_itemlist1(eid, item_name, item_content) values (%s, %s, %s)", (result[0], list1[i]["itemname"], list1[i]["itemcontent"]))
                        db.commit()  # 提交，使操作生效
                    except Exception as e:
                        print("insert item1 fail:", e)
                        db.rollback()  # 发生错误就回滚
                        return "-1"
                for i in range(len(list2)):
                    try:
                        cursor.execute("insert into info_itemlist2(eid, item_name, item_content) values (%s, %s, %s)", (result[0], list2[i]["itemname"], list2[i]["itemcontent"]))
                        db.commit()  # 提交，使操作生效
                    except Exception as e:
                        print("insert item2 fail:", e)
                        db.rollback()  # 发生错误就回滚
                        return "-1"
                print("cteate successfully!")
                return str(result)
            except Exception as e:
                print("Create task failed:", e)
                db.rollback()  # 发生错误就回滚
                return "-1"
        else:
            try:
                cursor.execute(
                    "update entry_info set entry_imgurl=%s,entry_body=%s where entry_name=%s",
                    (entrybody, entryname))
                db.commit()  # 提交，使操作生效
                cursor.execute("select id from entry_info where entry_name=%s", (entryname))
                result = cursor.fetchone()
                db.commit()  # 提交，使操作生效
                cursor.execute("delete from info_itemlist1 where eid=%s", (result[0]))
                db.commit()
                cursor.execute("delete from info_itemlist2 where eid=%s", (result[0]))
                db.commit()
                for i in range(len(list1)):
                    try:
                        cursor.execute("insert into info_itemlist1(eid, item_name, item_content) values (%s, %s, %s)", (result[0], list1[i]["itemname"], list1[i]["itemcontent"]))
                        db.commit()  # 提交，使操作生效
                    except Exception as e:
                        print("insert item1 fail:", e)
                        db.rollback()  # 发生错误就回滚
                        return "-1"
                for i in range(len(list2)):
                    try:
                        cursor.execute("insert into info_itemlist2(eid, item_name, item_content) values (%s, %s, %s)", (result[0], list2[i]["itemname"], list2[i]["itemcontent"]))
                        db.commit()  # 提交，使操作生效
                    except Exception as e:
                        print("insert item2 fail:", e)
                        db.rollback()  # 发生错误就回滚
                        return "-1"
                print("cteate successfully!")
                return str(result)
            except Exception as e:
                print("Create task failed:", e)
                db.rollback()  # 发生错误就回滚
                return "-1"


# @app.route('/create_test', methods=['POST', 'GET'])
# def create_test():
#     entrylist1 = request.form.get("entrylist1")
#     print(entrylist1)
#     data = eval(entrylist1)
#     print(data)
#     return "-1"


# 程序一开始运行的入口，0.0.0.0指任意地址，port是后端服务器提供服务的接口
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=2333)
    db.close()
    print("backend close")
