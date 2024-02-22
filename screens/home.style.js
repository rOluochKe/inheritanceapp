import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

const styles = StyleSheet.create({
  appBarWrapper: {
    marginHorizontal: 22,
    marginTop: SIZES.xLarge + 3
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    fontFamily: 'semiBold',
    fontSize: SIZES.medium,
    color: COLORS.gray
  },
  cNumber: {
    fontFamily: 'regular',
    fontWeight: '600',
    fontSize: 10,
    color: COLORS.lightWhite
  },
  content: {
    flexGrow: 1,
    paddingBottom: SIZES.xxLarge + 45,
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.small
  }
})

export default styles;