import React, { Fragment } from "react";
import { Page, Document, StyleSheet, Image } from "@react-pdf/renderer";
import { Text, View } from '@react-pdf/renderer';

const borderColor = '#3778C2'

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#fff',
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft: 50,
        paddingRight: 50,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    logo: {
        width: 84,
        height: 70,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    titleContainer: {
        marginTop: 24,
    },
    reportTitle: {
        color: '#3778C2',
        letterSpacing: 4,
        fontSize: 25,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    invoiceNoContainer: {
        flexDirection: 'row',
        marginTop: 36,
        justifyContent: 'flex-end'
    },
    invoiceDateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    invoiceDate: {
        fontSize: 12,
        fontStyle: 'bold',
    },
    label: {
        width: 100
    },
    headerContainer: {
        marginTop: 36,
        justifyContent: 'flex-start',
        width: '50%'
    },
    billTo: {
        marginTop: 20,
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique'
    },
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#3778C2',
    },container: {
        flexDirection: 'row',
        borderBottomColor: '#3778C2',
        backgroundColor: '#3778C2',
        color: '#fff',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    description: {
        width: '50%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    // qty: {
    //     width: '25%',
    //     borderRightColor: borderColor,
    //     borderRightWidth: 1,
    // },
    // rate: {
    //     width: '25%',
    //     borderRightColor: borderColor,
    //     borderRightWidth: 1,
    // },
    amount: {
        width: '50%'
    },
    row: {
        flexDirection: 'row',
        borderBottomColor: '#3778C2',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
    pdescription: {
        width: '50%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    // pqty: {
    //     width: '25%',
    //     borderRightColor: borderColor,
    //     borderRightWidth: 1,
    //     textAlign: 'right',
    //     paddingRight: 8,
    // },
    // prate: {
    //     width: '25%',
    //     borderRightColor: borderColor,
    //     borderRightWidth: 1,
    //     textAlign: 'right',
    //     paddingRight: 8,
    // },
    pamount: {
        width: '50%',
        textAlign: 'right',
        paddingRight: 8,
    },
});

const PdfDocument = ({ mort }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page} >
                {/* <Image style={styles.logo} src={logo} /> */}
                <View style={styles.titleContainer}>
        <Text style={styles.reportTitle}>Payment Invoice</Text>
    </View>
    <Fragment>
        <View style={styles.invoiceNoContainer}>
            <Text >Mortgage ID: </Text>
            <Text style={styles.invoiceDate}>{mort.mid}</Text>
        </View >
        <View style={styles.invoiceNoContainer}>
        <Text>Product name: {mort.productName}</Text>
        </View>
    </Fragment>
    <Fragment>
        <View style={styles.invoiceNoContainer}>
            <Text >Payement ID: </Text>
            <Text style={styles.invoiceDate}>{mort.pid}</Text>
        </View >
        <View style={styles.invoiceDateContainer}>
            <Text >Payment Date: </Text>
            <Text >{mort.date}</Text>
        </View >
    </Fragment>
    <View style={styles.headerContainer}>
        <Text style={styles.billTo}>Bill To:</Text>
        <Text>Customer Name: {mort.customerFirstName} {mort.customerLastName}</Text>
        <Text>Customer ID: {mort.mid}</Text>
    </View>
   
    <View style={styles.tableContainer}>
    <View style={styles.container}>
        <Text style={styles.description}>Date of payment</Text>
        {/* <Text style={styles.qty}>Market Value</Text>
        <Text style={styles.rate}>Daily Interest Rate</Text> */}
        <Text style={styles.amount}>Amount Paid</Text>
    </View>
    <View style={styles.row} >
            <Text style={styles.pdescription}>{mort.date}</Text>
            {/* <Text style={styles.pqty}>Rs. {mort.marketValue}</Text>
            <Text style={styles.prate}>{mort.interestRate}%</Text> */}
            <Text style={styles.pamount}>Rs. {mort.amount}</Text>
        </View>
        {/* <InvoiceTableFooter items={invoice.items} /> */}
    </View>
                {/* <InvoiceThankYouMsg /> */}
            </Page>
        </Document>
    );
}

export default PdfDocument;