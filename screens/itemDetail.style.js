import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite
  },
  upperRow: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: SIZES.xLarge,
    width: SIZES.width -44,
    zIndex: 999
  },
  image: {
    height: SIZES.height/2.4,
    width: '100%',
    resizeMode: 'cover',
  },
  details: {
    marginTop: -SIZES.large,
    backgroundColor: COLORS.lightWhite,
    width: SIZES.width,
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
  },
  titleRow: {
    marginHorizontal: 20,
    paddingBottom: SIZES.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SIZES.width -44,
    top: 20
  },
  title: {
    fontFamily: 'bold',
    fontSize: SIZES.large,
  },
  valueWrapper: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.small,
  },
  value: {
    padding: 6,
    fontFamily: 'bold',
    fontSize: SIZES.medium,
  },
  ratingRow: {
    paddingBottom: SIZES.small - 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SIZES.width,
    top: 5
  },
  rating: {
    top: SIZES.small,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: SIZES.small - 4
  },
  ratingText: {
    color: COLORS.gray,
    fontFamily: 'medium',
    paddingHorizontal: SIZES.small
  },
  descriptionWrapper: {
    marginTop: SIZES.large,
    marginHorizontal:SIZES.large
  },
  description: {
    fontFamily: 'medium',
    fontSize: SIZES.large -2,
  },
  descText: {
    fontFamily: 'regular',
    fontSize: SIZES.small,
    textAlign: 'justify',
    marginBottom: SIZES.small
  },
  location: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SIZES.width - 34,
    backgroundColor: COLORS.secondary,
    marginHorizontal: 12,
    padding: 5,
    borderRadius: SIZES.large
  },
  requestItemRow: {
    paddingBottom: SIZES.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SIZES.width - 34,
  },
  editBtn: {
    width: '49.5%',
    backgroundColor: COLORS.primary,
    padding: SIZES.small,
    borderRadius: SIZES.large,
    marginLeft: 12,
    marginTop: SIZES.small,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteBtn: {
    width: '49.5%',
    backgroundColor: COLORS.red,
    padding: SIZES.small,
    borderRadius: SIZES.large,
    marginLeft: 12,
    marginTop: SIZES.small,
    justifyContent: 'center',
    alignItems: 'center'
  },
  requestBtn: {
    width: '49.5%',
    backgroundColor: 'blue',
    padding: SIZES.small,
    borderRadius: SIZES.large,
    marginLeft: 12,
    marginTop: SIZES.small,
    justifyContent: 'center',
    alignItems: 'center'
  },
  requestItemTitle: {
    fontFamily: 'semiBold',
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
  }
})

export default styles
